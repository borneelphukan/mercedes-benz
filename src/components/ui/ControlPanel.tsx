import React from "react";
import "../../styles/ui/ControlPanel.css";
import Checkbox from "./Checkbox";
import SearchBar from "./SearchBar";

type ControlPanelProps = {
  columns: string[];
  visibleColumns: Record<string, boolean>;
  onCheckboxChange: (key: string) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const ControlPanel = ({
  columns,
  visibleColumns,
  onCheckboxChange,
  searchQuery,
  setSearchQuery,
}: ControlPanelProps) => {
  return (
    <div className="table-header">
      <div className="checkbox-group">
        {columns.map((column: string, index: number) => (
          <Checkbox
            key={`column${index + 1}`}
            label={column}
            checked={visibleColumns[`column${index + 1}`]}
            onChange={() => onCheckboxChange(`column${index + 1}`)}
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
  );
};

export default ControlPanel;
