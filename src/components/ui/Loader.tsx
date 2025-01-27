import "../../styles/ui/Loader.css";
const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <img
          src="mercedes-benz.svg"
          alt="Mercedes-Benz Logo"
          className="loader"
        />
      </div>
    </div>
  );
};

export default Loader;
