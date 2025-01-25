import { useEffect, useState } from "react";
import "../styles/pages/Home.css";
import { useTheme } from "../utilities/ThemeContext";
import Table from "../components/ui/Table";

const Home = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<{ columns: string[]; rows: any[][] } | null>(
    null
  );

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
        const data = {
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

        setData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

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
            paginationItems={paginationItems}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
