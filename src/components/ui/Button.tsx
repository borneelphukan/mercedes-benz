import classNames from "classnames";

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
  const getWidth = () => {
    switch (width) {
      case "small":
        return "w-1/12";
      case "medium":
        return "w-1/6";
      case "large":
        return "w-full";
      default:
        return "";
    }
  };

  const getButtonClass = () => {
    switch (style) {
      case "delete":
        return "bg-red-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:opacity-50 hover:bg-red-100 text-white justify-center font-semibold focus:outline-none focus:ring-1 focus:ring-red-100";
      case "primary":
        return "bg-cyan-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:opacity-50 hover:bg-cyan-100 text-white justify-center font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-100";
      case "secondary":
        return "bg-transparent disabled:text-gray-400 disabled:bg-transparent disabled:border-gray-300 hover:border-solid hover:border-cyan-100 hover:bg-cyan-300 hover:bg-teal-50 text-cyan-200 font-semibold hover:text-cyan-200 border border-cyan-200 focus:outline-none justify-center focus:ring-1 focus:ring-cyan-200";
      case "ghost":
        return "bg-transparent hover:bg-cyan-400 text-cyan-200 justify-center font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-200 disabled:text-gray-400 disabled:bg-transparent";
      default:
        return "";
    }
  };

  const buttonClass = classNames(
    getButtonClass(),
    "py-2 px-4 rounded",
    getWidth(),
    {
      "flex items-center uppercase": true,
      "cursor-not-allowed opacity-50": isDisabled,
    }
  );

  const arrowIcon =
    arrow === "left"
      ? "M15.75 19.5 8.25 12l7.5-7.5"
      : "m8.25 4.5 7.5 7.5-7.5 7.5";
  const addIcon = add ? "M12 4.5v15m7.5-7.5h-15" : "";

  return (
    <button className={buttonClass} disabled={isDisabled} onClick={onClick}>
      {add && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 mr-2"
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
          className="w-6 h-6 mr-2"
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
          className="w-6 h-6 ml-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={arrowIcon} />
        </svg>
      )}
    </button>
  );
};

export default Button;
