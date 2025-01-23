import "../../styles/ui/Checkbox.css";

type Props = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

const Checkbox = ({ label, checked, onChange }: Props) => {
  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox"
      />
      {label}
    </label>
  );
};

export default Checkbox;
