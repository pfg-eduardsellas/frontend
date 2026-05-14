import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  TableWrapper,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  EmptyCell,
  TypeBadge,
  SortIcon,
} from "./styles";

const columnHelper = createColumnHelper();

const COLUMNS = [
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => (
      <TypeBadge $type={info.getValue()}>{info.getValue()}</TypeBadge>
    ),
    size: 72,
  }),
  columnHelper.accessor("id", {
    header: "Node",
    cell: (info) => `#${info.getValue()}`,
    size: 52,
  }),
  columnHelper.accessor("error", {
    header: "Message",
  }),
];

function ErrorsTable({ graphActions }) {
  const [sorting, setSorting] = useState([]);

  const data = useMemo(
    () =>
      graphActions.flatMap((a) =>
        (a.errors ?? []).map((error) => ({ type: a.type, id: a.id, error })),
      ),
    [graphActions],
  );

  const table = useReactTable({
    data,
    columns: COLUMNS,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <TableWrapper>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <Th
                  key={header.id}
                  style={{ width: header.column.columnDef.size }}
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
              <EmptyCell colSpan={3}>No errors recorded.</EmptyCell>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableWrapper>
  );
}

export default ErrorsTable;
