import { useEffect, useState } from "react";
import "./Home.css";
import { useTheme } from "../utilities/ThemeContext";
import Table from "../components/common/Table";

const Home = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<{ columns: string[]; rows: any[][] } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paginationItems = ["5 per page", "10 per page", "15 per page"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data/data.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const json = await response.json();

        // Transform the JSON data into the required format
        const transformedData = {
          columns: [
            "ID",
            "Name",
            "Label",
            "Category",
            "System Value",
            "User Value",
            "Note",
          ],
          rows: json.data.map((item: any) => [
            item.id,
            item.name,
            item.label,
            item.category,
            item.system_value,
            item.user_value,
            item.note,
          ]),
        };

        setData(transformedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className={`home-container ${theme}`}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={`home-container ${theme}`}>
        <div className="error">⚠️ Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={`home-container ${theme}`}>
      <div className="home-content">
        {data && (
          <Table
            data={data}
            totalRecordCount={data.rows.length}
            view="contacts"
            paginationItems={paginationItems}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
