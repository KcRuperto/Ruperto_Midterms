import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

function genreColor(genre) {
  if (genre === "Pop") return "bg-pink-100 text-pink-700";
  if (genre === "Rock") return "bg-orange-100 text-orange-700";
  if (genre === "Indie") return "bg-green-100 text-green-700";
  if (genre === "Jazz") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-700";
}

const columns = [
  {
    accessorKey: "title",
    header: "Track",
    cell: (info) => (
      <div>
        <p className="font-medium text-gray-800">{info.getValue()}</p>
        <p className="text-xs text-gray-500">{info.row.original.artist}</p>
      </div>
    ),
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: (info) => (
      <span className={"rounded-full px-2.5 py-0.5 text-xs font-medium " + genreColor(info.getValue())}>
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "bpm",
    header: "BPM",
    cell: (info) => <span className="font-mono text-xs">{info.getValue()}</span>,
  },
  { accessorKey: "label", header: "Label" },
  { accessorKey: "role", header: "Role" },
];

export default function Track({ tracks, selectedId, onSelectRow }) {
  const [genreFilter, setGenreFilter] = useState("All");

  let data = tracks;
  if (genreFilter !== "All") {
    data = tracks.filter((t) => t.genre === genreFilter);
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 4 } },
  });

  return (
    <div className="rounded-md border border-gray-200 bg-white p-5 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-gray-800">Your Playlist</h2>
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-800"
        >
          <option>All</option>
          <option>Pop</option>
          <option>Rock</option>
          <option>Indie</option>
          <option>Jazz</option>
        </select>
      </div>

      {data.length === 0 && (
        <p className="text-sm text-gray-500">No tracks yet. Add one from the form.</p>
      )}

      {data.length > 0 && (
        <>
          <div className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row, i) => (
              <div
                key={row.original.id}
                onClick={() => onSelectRow(row.original.id)}
                className={
                  "flex items-center gap-3 px-2 py-2.5 rounded-md cursor-pointer hover:bg-gray-50 " +
                  (row.original.id === selectedId ? "bg-blue-50" : "")
                }
              >
                <span className="w-5 text-center text-xs text-gray-400">{i + 1}</span>
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    className={cell.column.id === "title" ? "flex-1 min-w-0" : "text-sm text-gray-600"}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-700 disabled:opacity-40"
            >
              Previous
            </button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-700 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}