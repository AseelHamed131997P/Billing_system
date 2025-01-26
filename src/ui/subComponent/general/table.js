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

function RowActions({ isEditing, onEdit, onCancel, onSave, onDelete }) {
  return (
    <div className="flex gap-2">
      {isEditing ? (
        <>
          <button
            onClick={onSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

function Table({ data, setData }) {
  // const initialData = [
  //   { id: 1, name: "Alice", age: 25, city: "New York" },
  //   { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
  //   { id: 3, name: "Charlie", age: 35, city: "Chicago" },
  // ];

  // const [data, setData] = useState(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingValues, setEditingValues] = useState({});

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "city",
      header: "City",
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const isEditing = editingRowId === row.original.id;
        return (
          <RowActions
            isEditing={isEditing}
            onEdit={() => {
              setEditingRowId(row.original.id);
              setEditingValues({ ...row.original });
            }}
            onCancel={() => {
              setEditingRowId(null);
              setEditingValues({});
            }}
            onSave={() => {
              const updatedData = data.map((item) =>
                item.id === editingRowId ? { ...item, ...editingValues } : item
              );
              setData(updatedData);
              setEditingRowId(null);
              setEditingValues({});
            }}
            onDelete={() => {
              setData((prevData) =>
                prevData.filter((item) => item.id !== row.original.id)
              );
            }}
          />
        );
      },
      id: "actions",
      enableColumnFilter: false,
      enableSorting: false,
    },
  ];

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
    <div className="p-10">
      <div className="flex justify-between mb-4">
        <button
          onClick={() =>
            setData((prevData) => [
              ...prevData,
              { id: prevData.length + 1, name: "New", age: 0, city: "Unknown" },
            ])
          }
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Row
        </button>
        <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="border p-2 rounded"
        />
      </div>
      <div>
        <table className="fixed-width-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                <tr className="bg-gray-200">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border p-2 text-left cursor-pointer"
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
                    <th key={header.id} className="border p-2 text-left">
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
                  <td key={cell.id}>
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
