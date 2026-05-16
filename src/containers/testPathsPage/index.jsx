import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import TestPathModal from "../homePage/components/TestPathModal";
import PathRunsModal from "../homePage/components/PathRunsModal";
import { useGetPathsQuery, useDeletePathMutation } from "../../api";
import { formatScheduleBadge } from "../homePage/helpers";
import Button from "../../components/button";
import {
  Container,
  PageWrapper,
  PageHeader,
  PageTitle,
  ScanContext,
  EmptyState,
  DisabledNotice,
  TableWrapper,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  EmptyCell,
  ScheduleTag,
  NodesBadge,
  NodesPath,
  ActionCell,
} from "./styles";

const columnHelper = createColumnHelper();

function TestPathsPage({ selectedScan }) {
  const [testPathOpen, setTestPathOpen] = useState(false);
  const [runModalPath, setRunModalPath] = useState(null);
  const [sorting, setSorting] = useState([]);

  const canCreatePath = selectedScan?.status === "done";

  const { data: savedPaths = [] } = useGetPathsQuery(selectedScan?.id, {
    skip: !selectedScan,
  });

  const [deletePath] = useDeletePathMutation();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue() || `Path #${info.row.original.id}`,
      }),
      columnHelper.accessor("path", {
        header: "Nodes",
        cell: (info) => {
          const nodes = info.getValue()?.split(",").filter(Boolean) ?? [];
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <NodesBadge>{nodes.length} nodes</NodesBadge>
              <NodesPath>{info.getValue()}</NodesPath>
            </div>
          );
        },
      }),
      columnHelper.accessor((row) => formatScheduleBadge(row), {
        id: "schedule",
        header: "Schedule",
        cell: (info) =>
          info.getValue() ? (
            <ScheduleTag>{info.getValue()}</ScheduleTag>
          ) : (
            <span style={{ color: "#d1d5db" }}>—</span>
          ),
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <ActionCell>
            <Button
              variant="secondary"
              size="sm"
              icon={<FontAwesomeIcon icon={faClockRotateLeft} style={{ width: 12, height: 12 }} />}
              text="History"
              onClick={() => setRunModalPath(row.original)}
              title="View run history"
            />
            <Button
              variant="danger"
              size="sm"
              text="Delete"
              onClick={() => deletePath({ scanId: selectedScan?.id, pathId: row.original.id })}
              title="Delete path"
            />
          </ActionCell>
        ),
      }),
    ],
    [selectedScan, deletePath],
  );

  const table = useReactTable({
    data: savedPaths,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Container>
      <PageWrapper>
        <PageHeader>
          <div>
            <PageTitle>Test Paths</PageTitle>
            {selectedScan && (
              <ScanContext>{selectedScan.target_url}</ScanContext>
            )}
          </div>
          <Button
            variant="primary"
            text="+ New test path"
            onClick={() => setTestPathOpen(true)}
            disabled={!canCreatePath}
            title={!canCreatePath ? "The scan must be complete to build a path" : ""}
          />
        </PageHeader>

        {!selectedScan && (
          <EmptyState>
            Create a scan from the navbar to see its test paths.
          </EmptyState>
        )}

        {selectedScan && !canCreatePath && (
          <DisabledNotice>
            This scan is <strong>{selectedScan.status}</strong>. Test paths can
            only be created once the scan is complete.
          </DisabledNotice>
        )}

        {selectedScan && (
          <TableWrapper>
            <Table>
              <Thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => (
                      <Th
                        key={header.id}
                        style={{ width: header.column.columnDef.size }}
                        $sortable={header.column.getCanSort()}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Th>
                    ))}
                  </tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <EmptyCell colSpan={4}>
                      {canCreatePath
                        ? "No test paths yet. Create one to start automating."
                        : "No test paths for this scan."}
                    </EmptyCell>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <Tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <Td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Td>
                      ))}
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableWrapper>
        )}
      </PageWrapper>

      <TestPathModal
        isOpen={testPathOpen}
        onClose={() => setTestPathOpen(false)}
        scanId={canCreatePath ? selectedScan?.id : null}
      />

      <PathRunsModal
        isOpen={!!runModalPath}
        onClose={() => setRunModalPath(null)}
        scanId={selectedScan?.id}
        path={runModalPath}
      />
    </Container>
  );
}

export default TestPathsPage;
