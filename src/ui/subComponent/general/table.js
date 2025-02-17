import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./table.css";
import SearchIcon from "../../../svgs/searchIcon.js";

function Table({
  data,
  setData,
  columns,
  globalFilter,
  setGlobalFilter,
  editingRowId,
  setEditingRowId,
  editingValues,
  setEditingValues,
}) {
  // const initialData = [
  //   { id: 1, name: "Alice", age: 25, city: "New York" },
  //   { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
  //   { id: 3, name: "Charlie", age: 35, city: "Chicago" },
  // ];

  // const [data, setData] = useState(initialData);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id.toString(),
  });

  return (
    <div className="p-10 ">
      {/* Search Input with Icon */}
      <div className="flex justify-end mb-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <SearchIcon />
          </span>
          <input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search customers..."
            className="border-2 p-4 pl-10 rounded border-gray-500 focus:outline-none focus:border-2  focus:border-blue-400"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-fixed min-w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                <tr className="bg-gray-200">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border p-3 text-left cursor-pointer"
                      style={{ width: `150px` }} // Set fixed width
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <span className="ml-2">
                            {header.column.getIsSorted() === "asc"
                              ? "🔼"
                              : header.column.getIsSorted() === "desc"
                              ? "🔽"
                              : "↕️"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>

                {/* Filter Row */}
                <tr className="bg-gray-100">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border p-3 text-left"
                      style={{ width: `150px` }} // Set fixed width
                    >
                      {header.column.getCanFilter() ? (
                        <input
                          value={header.column.getFilterValue() || ""}
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                          placeholder={`Filter ${header.column.columnDef.header}`}
                          className="mt-2 border p-1 rounded w-full"
                        />
                      ) : null}
                    </th>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border p-3 whitespace-normal break-words"
                    style={{ width: `150px` }}
                  >
                    {editingRowId === row.original.id &&
                    cell.column.id !== "actions" ? (
                      <input
                        type="text"
                        value={editingValues[cell.column.id] || ""}
                        onChange={(e) =>
                          setEditingValues({
                            ...editingValues,
                            [cell.column.id]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex items-center gap-4">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 border p-2 rounded"
          />
        </div>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;
