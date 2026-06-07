import { flexRender } from "@tanstack/react-table";
import { Wrapper, Table, Thead, Th, ThContent, Tbody, Tr, Td, EmptyCell } from "./styles";

function SortChevron({ direction }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {direction === "asc"  && <polyline points="18 15 12 9 6 15" />}
      {direction === "desc" && <polyline points="6 9 12 15 18 9" />}
      {!direction && (
        <>
          <polyline points="18 15 12 9 6 15" strokeOpacity="0.35" />
          <polyline points="6 9 12 15 18 9" strokeOpacity="0.35" />
        </>
      )}
    </svg>
  );
}

function DataTable({ table, emptyMessage = "No data.", size = "md" }) {
  const colSpan = table.getAllColumns().length;

  return (
    <Wrapper $size={size}>
      <Table $size={size}>
        <Thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <Th
                  key={header.id}
                  $size={size}
                  $sortable={header.column.getCanSort()}
                  style={{ width: header.column.columnDef.size }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <ThContent>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <SortChevron direction={header.column.getIsSorted() || undefined} />
                    )}
                  </ThContent>
                </Th>
              ))}
            </tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <EmptyCell colSpan={colSpan} $size={size}>{emptyMessage}</EmptyCell>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} $size={size}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Wrapper>
  );
}

export default DataTable;
