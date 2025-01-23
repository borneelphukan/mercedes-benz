import React, { useState } from "react";
import "./Table.css";
import SearchBar from "../ui/SearchBar";

interface TableProps {
  data: { columns: string[]; rows: any[][] };
  totalRecordCount: number;
  view: string;
  paginationItems: string[];
}

const Table: React.FC<TableProps> = ({
  data,
  totalRecordCount,
  paginationItems,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredRows = data.rows.filter((row) =>
    row.some((cell) =>
      cell.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (columnIndex: number) => {
    if (sortColumn === columnIndex) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnIndex);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const sortedRows = [...paginatedRows].sort((a, b) => {
    if (sortColumn === null) return 0;

    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
    return 0;
  });

  const handleItemsPerPageChange = (selected: string) => {
    const items = parseInt(selected.split(" ")[0], 10);
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="table-header">
        <SearchBar
          query={searchQuery}
          setQuery={setSearchQuery}
          placeholder="Search anything"
          mode="type"
        />
      </div>

      {sortedRows.length > 0 ? (
        <table className="table">
          <tr></tr>
          <thead>
            <tr>
              {data.columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => toggleSort(index)}
                  className="sortable-column"
                >
                  {column}{" "}
                  {sortColumn === index ? (
                    sortOrder === "asc" ? (
                      <span className="arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    )
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-records">⚠️ Record(s) not Found</div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <div></div>
        <div className="pagination-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            &lt; Prev
          </button>
          <span> {currentPage}</span>
          <button
            disabled={
              currentPage === Math.ceil(totalRecordCount / itemsPerPage)
            }
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(totalRecordCount / itemsPerPage))
              )
            }
          >
            Next &gt;
          </button>
        </div>
        <select
          value={`${itemsPerPage} per page`}
          onChange={(e) => handleItemsPerPageChange(e.target.value)}
        >
          {paginationItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;
