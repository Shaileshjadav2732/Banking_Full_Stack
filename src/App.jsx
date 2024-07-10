import { Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import Root from "./components/Root";
import "react-toastify/dist/ReactToastify.css";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

import { lazy, useContext, useEffect, useState } from "react";
import { fetchKeyPairs } from "./https/auth";
import { Context, server } from "./main";
import axios from "axios";

const HomePage = lazy(() => import("./components/HomePage"));
const SignUp = lazy(() => import("./components/SignUp"));
const LogIn = lazy(() => import("./components/LogIn"));
const UserHomePage = lazy(() => import("./components/UserHomePage"));
const MakeTransaction = lazy(() => import("./components/MakeTransaction"));
const History = lazy(() => import("./components/History"));
const UserProfile = lazy(() => import("./components/UserProfile"));
const UserNav = lazy(() => import("./components/UserNav"));
const AdminNav = lazy(() => import("./components/admin/AdminNav"));
const AdminHome = lazy(() => import("./components/admin/AdminHome"));
const Transactions = lazy(() => import("./components/admin/Transactions"));
const Users = lazy(() => import("./components/admin/Users"));
const AdminLogin = lazy(() => import("./components/admin/AdminLogin"));
const UserTransaction = lazy(() => import("./components/admin/UserTransaction"));
const EditProfile = lazy(() => import("./components/EditProfile"));

function App() {
  // Error
  const [error, setError] = useState("");
  const [keyPairs, setKeyPairs] = useState({
    publicKey: "",
    privateKey: "",
  });

  const { user, setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/admin/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.admin);
        setIsAuthenticated(true);
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    async function fetchPairsOfKey() {
      try {
        const objectOfKeyPairs = await fetchKeyPairs();
        setKeyPairs(objectOfKeyPairs);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
      }
    }
    fetchPairsOfKey();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Root />}
        errorElement={<Error ErrorFrom={"logoutUser"} error={error} />}
      >
        <Route index={true} element={<HomePage />} />
        <Route path="/signup" element={<SignUp keyPairs={keyPairs} />} />
        <Route path="/login" element={<LogIn />} />
      </Route>

      <Route element={<AuthOutlet fallbackPath="/login" />}>
        <Route
          path="/user"
          element={<UserNav />}
          errorElement={<Error ErrorFrom={"loginUser"} error={error} />}
        >
          <Route index={true} element={<UserHomePage />} />
          <Route path="transaction" element={<MakeTransaction />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="editprofile" element={<EditProfile />} />
        </Route>
      </Route>

      <Route
        path="/admin"
        element={<AdminNav />}
        errorElement={<Error ErrorFrom={"loginUser"} error={error} />}
      >
        <Route index={true} element={<AdminHome />} />
        <Route path="transaction" element={<Transactions />} />
        <Route path="transaction/:id" element={<UserTransaction />} />
        <Route path="users" element={<Users />} />
        <Route path="login" element={<AdminLogin />} />
      </Route>
    </Routes>
  );
}

export default App;
