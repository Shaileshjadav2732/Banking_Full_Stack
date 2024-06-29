import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createContext } from "react";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  return (
    <Context.Provider value={{ isAuthenticated: false }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
