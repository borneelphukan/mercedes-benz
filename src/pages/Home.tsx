import { useEffect, useState } from "react";
import "../styles/pages/Home.css";
import { useTheme } from "../utilities/ThemeContext";
import Table from "../components/ui/Table";
import Pagination from "../components/ui/Pagination";
import SearchBar from "../components/ui/SearchBar";
import Checkbox from "../components/ui/Checkbox";
import Category from "../components/ui/Category";

const Home = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<{ columns: string[]; rows: any[][] } | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const paginationItems = ["5 per page", "10 per page", "15 per page"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data/data.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const json = await response.json();

        const defaultSelectedColumns = [
          "Label",
          "Category",
          "System Value",
          "User Value",
          "Note",
        ];

        const data = {
          columns: [
            "ID",
            "Name",
            "Label",
            "Category",
            "System Value",
            "User Value",
            "Note",
          ],
          rows: json.data.map((item: any) => [
            item.id,
            item.name,
            item.label,
            item.category,
            item.system_value,
            item.user_value,
            item.note,
          ]),
        };

        setData(data);

        // Initialize visible columns
        setVisibleColumns(
          data.columns.reduce((acc: Record<string, boolean>, col, index) => {
            acc[`column${index + 1}`] = defaultSelectedColumns.includes(col);
            return acc;
          }, {})
        );
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // categoryFilter
  const categoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCheckboxChange = (key: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (selected: string) => {
    const items = parseInt(selected.split(" ")[0], 10);
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const paginatedData = data
    ? {
        ...data,
        rows: data.rows
          .filter(
            (row) =>
              !selectedCategory ||
              row[data.columns.indexOf("Category")] === selectedCategory
          )
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
      }
    : null;

  // Check if any column is selected
  const noVisibleColumns = Object.values(visibleColumns).every(
    (isVisible) => !isVisible
  );

  if (error) {
    return (
      <div className={`home-container ${theme}`}>
        <div className="error">⚠️ Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={`home-container ${theme}`}>
      <div className="filter-container">
        <div className="filter-row">
          <Category data={data} onCategoryChange={categoryFilter} />
          <SearchBar
            query={searchQuery}
            setQuery={setSearchQuery}
            placeholder="Search"
          />
        </div>
        <div className="checkbox-group">
          {/* Section A */}
          {data?.columns.map((column, index) => (
            <Checkbox
              key={`column${index + 1}`}
              label={column}
              checked={visibleColumns[`column${index + 1}`]}
              onChange={() => handleCheckboxChange(`column${index + 1}`)}
            />
          ))}
        </div>
      </div>

      {/* When no Checkboxes are selected in Section A */}
      {noVisibleColumns && (
        <div className="no-data">
          Please select at least one column to display the table.
        </div>
      )}

      <div className="home-content">
        {paginatedData && !noVisibleColumns && (
          <Table
            data={paginatedData}
            visibleColumns={visibleColumns}
            searchQuery={searchQuery}
          />
        )}
      </div>

      {/* Data and columns present */}
      {data && !noVisibleColumns && (
        <div className="pagination-container">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(
              data.rows.filter(
                (row) =>
                  !selectedCategory ||
                  row[data.columns.indexOf("Category")] === selectedCategory
              ).length / itemsPerPage
            )}
            itemsPerPage={itemsPerPage}
            paginationItems={paginationItems}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
