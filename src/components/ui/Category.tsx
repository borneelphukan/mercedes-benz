import React, { useEffect, useState } from "react";
import "../../styles/ui/Category.css";

type Props = {
  data: { columns: string[]; rows: any[][] } | null;
  onCategoryChange: (selectedCategory: string) => void;
}

function Category({ data, onCategoryChange }: Props) {
  const [categories, setCategories] = useState<string[]>([]);

  // filters category data when implemented
  useEffect(() => {
    if (data) {
      const categoryIndex = data.columns.indexOf("Category");
      if (categoryIndex !== -1) {
        const uniqueCategories = Array.from(
          new Set(data.rows.map((row) => row[categoryIndex]))
        );
        setCategories(uniqueCategories);
      }
    }
  }, [data]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onCategoryChange(event.target.value);
  };

  return (
    <div className="category-container">
      <div className="dropdown-wrapper">
        <select
          id="category-select"
          className="category-dropdown"
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="dropdown-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </div>
  );
}

export default Category;
