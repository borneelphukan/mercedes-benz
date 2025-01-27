import "../../styles/ui/Dropdown.css";

type Props = {
  items: string[];
  selectedItem: string;
  onChange: (selected: string) => void;
};

const Dropdown = ({ items, selectedItem, onChange }: Props) => {
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
      </div>
    </div>
  );
};

export default Dropdown;
