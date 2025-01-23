import "../../styles/ui/Loader.css";
const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader"></div>
        <div className="ripple"></div>
      </div>
    </div>
  );
};

export default Loader;
