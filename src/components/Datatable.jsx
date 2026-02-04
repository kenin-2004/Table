
import React, { useState, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const Datatable = ({ columns, data, sortOrder }) => {

  // scroll container
  const parentRef = useRef(null);

  // FILTER for each column

  const [filters, setFilters] = useState(() => {
    const obj = {};
    columns.forEach((col) => {
      obj[col.key] = "";
    });
    return obj;
  });

   // SORTING, usememo - prevents re-sorting every render 

  const sortedData = useMemo(() => {
    // copying data bcz sort mutates og array
    let temp = [...data];

    if (!sortOrder) return temp;

    // always sort by id
    const mainCol = columns[0];

    temp.sort((a, b) => {
      const A = a[mainCol.key];
      const B = b[mainCol.key];

      if (mainCol.type === "number") {
        return sortOrder === "asc" ? A - B : B - A;
      }

    // if column is string 
      return sortOrder === "asc" ? A.localeCompare(B) : B.localeCompare(A);
    });

    return temp;
  }, [data, sortOrder, columns]);

  /* ---------------- FILTER ---------------- */

  const filteredData = useMemo(() => {
    return sortedData.filter((row) => {
      return columns.every((col) => {
        const value = row[col.key]?.toString().toLowerCase();

        const filter = filters[col.key].toLowerCase();

        return value.includes(filter);
      });
    });
  }, [sortedData, filters, columns]);

  // virtualizer
  const rowVirtualizer = useVirtualizer({
    count: filteredData.length,

    getScrollElement: () => parentRef.current,

    estimateSize: () => 20,

    overscan: 10,
  });

  const handleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
      {/* HEADER */}
      <table className="min-w-full border  border-gray-200 table-fixed">
        {/* Column Widths */}
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} style={{ width: col.width }} />
          ))}
        </colgroup>

        <thead className="bg-gray-700 text-white">
          {/* Titles */}
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-center text-sm font-semibold border-2 border-black"
              >
                {col.label}
              </th>
            ))}
          </tr>

          {/* Filters */}
          <tr className=" ">
            {columns.map((col) => (
              <th key={col.key} className="px-2 py-1  ">
                <input
                  className="w-full px-1 text-white  text-sm  "
                  placeholder={`Search ${col.label}`}
                  value={filters[col.key]}
                  onChange={(e) => handleFilter(col.key, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
      </table>

      {/* SCROLL AREA */}
      <div
        ref={parentRef}
        className="overflow-y-auto"
        style={{
          height: "500px",
          
        }}
      >
        {/* fake height create illusion of full height */}
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {/* BODY TABLE */}
          <table
            className="min-w-full table-fixed text-center"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
            }}
          >
            {/* Same Column Widths */}
            <colgroup>
              {columns.map((col) => (
                <col key={col.key} style={{ width: col.width }}  />
              ))}
            </colgroup>

         
            <tbody>
  {filteredData.length === 0 ? (
    <tr>
      <td
        colSpan={columns.length}
        className="text-center py-6 text-gray-500 font-medium"
      >
        No Records Found
      </td>
    </tr>
  ) : (
    rowVirtualizer.getVirtualItems().map((virtualRow) => {
      const row = filteredData[virtualRow.index];

      return (
        <tr
          key={virtualRow.key}
          ref={rowVirtualizer.measureElement}
          style={{
            transform: `translateY(${virtualRow.start}px)`,
          }}
          className={`${
            virtualRow.index % 2 === 0
              ? "bg-gray-50"
              : "bg-white"
          } hover:bg-blue-50 transition`}
        >
          {columns.map((col) => (
            <td key={col.key} className="px-4 py-2 text-sm">
              {col.type === "date"
                ? new Date(row[col.key]).toLocaleDateString()
                : row[col.key]}
            </td>
          ))}
        </tr>
      );
    })
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Datatable;
