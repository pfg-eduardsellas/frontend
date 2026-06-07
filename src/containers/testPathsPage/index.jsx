import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import DataTable from "../../components/dataTable";
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
          <DataTable
            table={table}
            emptyMessage={canCreatePath ? "No test paths yet. Create one to start automating." : "No test paths for this scan."}
          />
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
