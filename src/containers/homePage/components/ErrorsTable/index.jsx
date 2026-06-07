import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import DataTable from "../../../../components/dataTable";
import { TypeBadge } from "./styles";

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

  return <DataTable table={table} size="sm" emptyMessage="No errors recorded." />;
}

export default ErrorsTable;
