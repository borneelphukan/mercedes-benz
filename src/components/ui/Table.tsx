import { useState } from "react";
import "../../styles/ui/Table.css";

type Props = {
  data: { columns: string[]; rows: any[][] };
  visibleColumns: Record<string, boolean>;
  searchQuery: string;
};

const Table = ({ data, visibleColumns, searchQuery }: Props) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<number | null>(null);

  // filtering based on searchbar query
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
  };

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortColumn === null) return 0;

    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

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
            {sortedRows.map((row, rowIndex) => (
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
    </div>
  );
};

export default Table;
