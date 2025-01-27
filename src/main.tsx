import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/color.css";
import { ThemeProvider } from "./utilities/ThemeContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
