import "../../styles/ui/Button.css";

type Props = {
  text?: string;
  arrow?: "left" | "right";
  style?: "primary" | "secondary" | "ghost" | "delete";
  isDisabled?: boolean;
  width?: "small" | "medium" | "large";
  add?: boolean;
  onClick?: () => void;
};

const Button = ({
  text = "Button",
  arrow,
  style = "primary",
  isDisabled = false,
  width = "medium",
  add = false,
  onClick,
}: Props) => {
  const arrowIcon =
    arrow === "left"
      ? "M15.75 19.5 8.25 12l7.5-7.5"
      : "m8.25 4.5 7.5 7.5-7.5 7.5";
  const addIcon = add ? "M12 4.5v15m7.5-7.5h-15" : "";

  return (
    <button
      className={`button ${style} ${width}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {add && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="icon"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={addIcon} />
        </svg>
      )}
      {arrow === "left" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="icon"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={arrowIcon} />
        </svg>
      )}
      {text}
      {arrow === "right" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="icon"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={arrowIcon} />
        </svg>
      )}
    </button>
  );
};

export default Button;
