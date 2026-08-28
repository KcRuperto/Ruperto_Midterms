import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const columns = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "genre", header: "Genre" },
  { accessorKey: "artist", header: "Artist" },
  { accessorKey: "bpm", header: "BPM" },
  { accessorKey: "label", header: "Label" },
  { accessorKey: "role", header: "Role" },
];

export default function Track({ tracks, selectedId, onSelectRow }) {
  const [genreFilter, setGenreFilter] = useState("All");

  const data = useMemo(() => {
    if (genreFilter === "All") return tracks;
    return tracks.filter((t) => t.genre === genreFilter);
  }, [tracks, genreFilter]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 4 } },
  });

  return (
    <div className="mb-6 rounded-xl border border-violet-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-violet-800">Registry</h2>
        <select
          className="rounded-lg border border-violet-100 px-2.5 py-1.5 text-sm"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pop</option>
          <option>Rock</option>
          <option>Indie</option>
          <option>Jazz</option>
        </select>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-slate-500">
          No tracks yet. Add one from the form.
        </p>
      ) : (
        <>
          <table className="w-full border-collapse text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border-b border-violet-100 px-2.5 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.original.id}
                  className={`cursor-pointer hover:bg-violet-50 ${
                    row.original.id === selectedId ? "bg-violet-100" : ""
                  }`}
                  onClick={() => onSelectRow(row.original.id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-b border-violet-100 px-2.5 py-2.5"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
            <button
              className="rounded-md border border-violet-100 bg-white px-3 py-1.5 text-slate-700 hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <button
              className="rounded-md border border-violet-100 bg-white px-3 py-1.5 text-slate-700 hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}