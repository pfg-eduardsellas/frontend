import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import DataTable from "../../../../components/dataTable";
import { FilterBar, FilterChip, ImpactBadge, TruncatedText } from "./styles";

const IMPACT_ORDER = ["critical", "serious", "moderate", "minor"];
const IMPACT_META = {
  critical: { color: "#dc2626", bg: "#fee2e2" },
  serious: { color: "#ea580c", bg: "#ffedd5" },
  moderate: { color: "#ca8a04", bg: "#fefce8" },
  minor: { color: "#9ca3af", bg: "#f3f4f6" },
};

const columnHelper = createColumnHelper();

const COLUMNS = [
  columnHelper.accessor("impact", {
    header: "Impact",
    cell: (info) => (
      <ImpactBadge $impact={info.getValue()}>
        {info.getValue() ?? "?"}
      </ImpactBadge>
    ),
    size: 76,
    sortingFn: (a, b) =>
      IMPACT_ORDER.indexOf(a.original.impact) -
      IMPACT_ORDER.indexOf(b.original.impact),
  }),
  columnHelper.accessor("rule_id", {
    header: "Rule",
    cell: (info) => <span>{info.getValue()}</span>,
    size: 110,
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("nodes", {
    header: "Elements",
    cell: (info) => info.getValue()?.length ?? 0,
    size: 72,
  }),
];

function AccessibilityTable({ graphActions }) {
  const [sorting, setSorting] = useState([{ id: "impact", desc: false }]);
  const [activeFilter, setActiveFilter] = useState(null);

  const data = useMemo(
    () =>
      graphActions.flatMap((a) =>
        (a.accessibility_violations ?? []).map((v) => ({
          ...v,
          actionType: a.type,
          action_id: a.id,
        })),
      ),
    [graphActions],
  );

  const filteredData = useMemo(
    () => (activeFilter ? data.filter((v) => v.impact === activeFilter) : data),
    [data, activeFilter],
  );

  const counts = useMemo(
    () =>
      IMPACT_ORDER.reduce((acc, impact) => {
        acc[impact] = data.filter((v) => v.impact === impact).length;
        return acc;
      }, {}),
    [data],
  );

  const table = useReactTable({
    data: filteredData,
    columns: COLUMNS,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <FilterBar>
        {IMPACT_ORDER.map((impact) => {
          const meta = IMPACT_META[impact];
          const n = counts[impact];
          return (
            <FilterChip
              key={impact}
              $active={activeFilter === impact}
              $color={meta.color}
              $bg={meta.bg}
              onClick={() =>
                setActiveFilter((prev) => (prev === impact ? null : impact))
              }
            >
              {impact} ({n})
            </FilterChip>
          );
        })}
      </FilterBar>

      <DataTable
        table={table}
        size="sm"
        emptyMessage={`No violations${activeFilter ? ` for "${activeFilter}"` : ""} recorded.`}
      />
    </>
  );
}

export default AccessibilityTable;
