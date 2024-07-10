import React from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import styles from "../style/Table.module.css"; // Import styles
import { IoSearch } from "react-icons/io5";

const Table = ({ columns, data, pagination = false, max }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    gotoPage,
    pageCount,
    state: { pageIndex },
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: max }, // Start from the first page
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter } = state;
  // console.log(pageIndex)

  return (
    <div className="overflow-x-auto">
      <button className="flex border-2 border-black p-1  rounded-xl m-auto mt-8">
        <input
          className="h-9 w-72 border-none outline-none text-xl"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
        <IoSearch className="h-8 w-8 mr-4" />
      </button>
      <table className={styles.table} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="pl-8"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>

                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="pl-8">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {pagination && (
        <div className={styles.pagination}>
          {" "}
          <button onClick={() => gotoPage(0)}>Go to first page</button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <span className="mr-3">{`${pageIndex + 1} of ${pageCount}`}</span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
          <button onClick={() => gotoPage(pageCount - 1)}>
            Go to Last page
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
