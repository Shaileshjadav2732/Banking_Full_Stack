import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const server = "http://localhost:3000";
export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [showOtpVer, IsShowOtpVer] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
 const [user, setUser] = useState({});
  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        isAuthenticated,
        setIsAuthenticated,
        showOtpVer,
        IsShowOtpVer,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
