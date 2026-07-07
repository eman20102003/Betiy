import { useContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ThemeContext } from "./context/ThemeContext";
import "./App.css";

function App() {

  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <AppRoutes />
    </div>
  );
}

export default App;