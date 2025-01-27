import { useEffect, useState } from "react";
import "../../styles/ui/Category.css";

type Props = {
  data: { columns: string[]; rows: any[][] } | null;
  onCategoryChange: (selectedCategory: string) => void;
};

function Category({ data, onCategoryChange }: Props) {
  const [categories, setCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const categoryIndex = data.columns.indexOf("Category");
      if (categoryIndex !== -1) {
        const uniqueCategories = [
          ...new Set(data.rows.map((row) => row[categoryIndex])),
        ];
        setCategories(uniqueCategories);
      }
    }
  }, [data]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="category-container">
      <div
        className={`dropdown-wrapper ${isDropdownOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        <select
          id="category-select"
          className="dropdown-select"
          onChange={change}
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="dropdown-icon">
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
        </div>
      </div>
    </div>
  );
}

export default Category;
