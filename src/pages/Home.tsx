import { useEffect, useState } from "react";
import "../styles/pages/Home.css";
import { useTheme } from "../utilities/ThemeContext";
import Table from "../components/ui/Table";
import Pagination from "../components/ui/Pagination";
import SearchBar from "../components/ui/SearchBar";
import Checkbox from "../components/ui/Checkbox";
import Category from "../components/ui/Category";

type RowItem = {
  id: number;
  name: string;
  label: string;
  category: string;
  system_value: string | number;
  user_value: string | number;
  note: string;
};

const Home = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<{ columns: string[]; rows: any[][] } | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showColumns, setShowColumns] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const paginationItems = ["5 per page", "10 per page", "15 per page"];
  const noColumnsShown = Object.values(showColumns).every(
    (isVisible) => !isVisible
  );

  // Fetch data from data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data/data.json");
        const json = await response.json();

        const defaultColumns = [
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
          rows: json.data.map((item: RowItem) => [
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

        // Set default visible columns
        setShowColumns(
          data.columns.reduce((acc: Record<string, boolean>, col, index) => {
            acc[`column${index + 1}`] = defaultColumns.includes(col);
            return acc;
          }, {})
        );
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // filter items through category (mandatory function)
  const categoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  // checkboxes for showing / hiding columns
  const changeCheckbox = (key: string) => {
    setShowColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Pagination functions
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const changePaginationLimit = (selected: string) => {
    const items = parseInt(selected.split(" ")[0], 10);
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  let paginatedData;

  if (data) {
    paginatedData = {
      ...data,
      rows: data.rows
        .filter(
          (row) =>
            !selectedCategory ||
            row[data.columns.indexOf("Category")] === selectedCategory
        )
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    };
  } else {
    paginatedData = null;
  }

  return (
    <div className={`home-container ${theme}`}>
      <div className="filter-container">
        {/* Category and Searchbar */}
        <div className="filter-row">
          <Category data={data} onCategoryChange={categoryFilter} />
          <SearchBar
            query={searchQuery}
            setQuery={setSearchQuery}
            placeholder="Search"
          />
        </div>
        {/* Checkboxes */}
        <div className="checkbox-group">
          {data?.columns.map((column, index) => (
            <Checkbox
              key={`column${index + 1}`}
              label={column}
              checked={showColumns[`column${index + 1}`]}
              onChange={() => changeCheckbox(`column${index + 1}`)}
            />
          ))}
        </div>
      </div>

      {/* If no columns are selected */}
      {noColumnsShown && (
        <div className="no-data">
          Please select at least one column to display the table.
        </div>
      )}

      <div className="home-content">
        {paginatedData && !noColumnsShown && (
          <Table
            data={paginatedData}
            showColumns={showColumns}
            searchQuery={searchQuery}
          />
        )}
      </div>

      {/* Data and columns present */}
      {data && !noColumnsShown && (
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
            onPageChange={changePage}
            onLimitChange={changePaginationLimit}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
