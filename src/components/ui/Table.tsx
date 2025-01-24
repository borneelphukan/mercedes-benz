import React, { useState } from "react";
import "../../styles/ui/Table.css";
import SearchBar from "./SearchBar";
import Checkbox from "./Checkbox";
import Button from "./Button";

type Props = {
  data: { columns: string[]; rows: any[][] };
  totalRecordCount: number;
  view: string;
  paginationItems: string[];
};

const Table = ({ data, totalRecordCount, paginationItems }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [visibleColumns, setVisibleColumns] = useState(() =>
    data.columns.reduce(
      (acc: Record<string, boolean>, col: string, index: number) => {
        const defaultSelectedColumns = [
          "Label",
          "Category",
          "System Value",
          "User Value",
          "Note",
        ];

        acc[`column${index + 1}`] = defaultSelectedColumns.includes(col);
        return acc;
      },
      {}
    )
  );

  // Click checkbox to hide/show columns
  const checkboxChange = (key: string) => {
    setVisibleColumns((prev: Record<string, boolean>) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // filtering based on searchbar
  const filteredRows = data.rows.filter((row) =>
    row.some((cell) =>
      cell.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // sorting
  const toggleSort = (columnIndex: number) => {
    if (sortColumn === columnIndex) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnIndex);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortColumn === null) return 0;

    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (valueA === null || valueB === null) return 0;

    if (typeof valueA === "string" && typeof valueB === "string") {
      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    }
    if (typeof valueA === "number" && typeof valueB === "number") {
      if (sortOrder === "asc") {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    }
    return 0;
  });

  // Number of items to be displayed per page
  const handleItemsPerPageChange = (selected: string) => {
    const items = parseInt(selected.split(" ")[0], 10);
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  // Any matches from the Search Bar are highlighed in yellow
  const highlight = (text: string, query: string): React.ReactNode => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      <div className="table-header">
        <div className="checkbox-group">
          {data.columns.map((column: string, index: number) => (
            <Checkbox
              key={`column${index + 1}`}
              label={column}
              checked={visibleColumns[`column${index + 1}`]}
              onChange={() => checkboxChange(`column${index + 1}`)}
            />
          ))}
        </div>
        <SearchBar
          query={searchQuery}
          setQuery={setSearchQuery}
          placeholder="Search anything"
          mode="type"
        />
      </div>

      {sortedRows.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              {data.columns.map(
                (column, index) =>
                  visibleColumns[`column${index + 1}`] && (
                    <th
                      key={index}
                      onClick={() => toggleSort(index)}
                      className="sortable-column"
                    >
                      <div className="header-content">
                        <span>{column}</span>
                        {sortColumn === index ? (
                          sortOrder === "asc" ? (
                            <span className="arrow">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
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
                                strokeWidth="1.5"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </span>
                          )
                        ) : null}
                      </div>
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {sortedRows
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map(
                    (cell, cellIndex) =>
                      visibleColumns[`column${cellIndex + 1}`] && (
                        <td key={cellIndex}>
                          {typeof cell === "string" || typeof cell === "number"
                            ? highlight(cell.toString(), searchQuery)
                            : cell}
                        </td>
                      )
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <table className="table">
          <thead>
            <tr>
              {data.columns.map(
                (column, index) =>
                  visibleColumns[`column${index + 1}`] && (
                    <th key={index} className="sortable-column">
                      {column}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={data.columns.length} className="no-records">
                ⚠️ No Data Exist
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="pagination">
        <div></div>
        <div className="pagination-center">
          <Button
            text="Prev"
            arrow="left"
            isDisabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
          <span> {currentPage}</span>

          <Button
            text="Next"
            arrow="right"
            isDisabled={
              currentPage === Math.ceil(totalRecordCount / itemsPerPage)
            }
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(totalRecordCount / itemsPerPage))
              )
            }
          />
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
