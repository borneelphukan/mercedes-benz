import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<string>("light");

  // Checks theme in localStorage and sets the theme in the state
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Applies and updates the theme in the frontend
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    theme === "light" ? "#ffffff" : "#2d3748";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === "light" ? "dark" : "light";
    });
  };

  return (
    // theme, toggleTheme are the shared states being accessed
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook to access ThemeContext
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
