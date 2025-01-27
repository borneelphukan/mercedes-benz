import "../../styles/ui/Button.css";

type Props = {
  text: string;
  arrow?: "left" | "right";
  isDisabled?: boolean;
  onClick?: () => void;
};

// Button with arrows
const Button = ({ text, arrow, isDisabled = false, onClick }: Props) => {
  const arrowLeft = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="icon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );

  const arrowRight = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="icon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );

  return (
    <button className="button" disabled={isDisabled} onClick={onClick}>
      {arrow === "left" && arrowLeft}
      {text}
      {arrow === "right" && arrowRight}
    </button>
  );
};

export default Button;
