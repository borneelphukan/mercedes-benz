import "../../styles/ui/Dropdown.css";

type DropdownProps = {
  items: string[];
  selectedItem: string;
  onChange: (selected: string) => void;
};

const Dropdown = ({ items, selectedItem, onChange }: DropdownProps) => {
  return (
    <div className="dropdown">
      <div className="dropdown-wrapper">
        <select
          value={selectedItem}
          onChange={(e) => onChange(e.target.value)}
          className="dropdown-select"
        >
          {items.map((item, index) => (
            <option key={index} value={item}>
              {item}
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
};

export default Dropdown;
