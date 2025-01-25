import "../../styles/ui/Dropdown.css";

type DropdownProps = {
  items: string[];
  selectedItem: string;
  onChange: (selected: string) => void;
};

const Dropdown = ({ items, selectedItem, onChange }: DropdownProps) => {
  return (
    <div className="dropdown">
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
    </div>
  );
};

export default Dropdown;
