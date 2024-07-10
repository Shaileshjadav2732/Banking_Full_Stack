import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../Loader";
import { Context, server } from "../../main";
import axios from "axios";

export default function AdminNav() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const logOutHandler = (e) => {
    e.preventDefault();
    try {
      axios.get(`${server}/admin/logout`, { withCredentials: true });
      setIsAuthenticated(false);
      navigate("/admin/login");
    } catch (error) {
      console.log(error);
      setIsAuthenticated(true);
    }
  };
  return (
    <Suspense fallback={<Loader />}>
      <nav className="flex justify-between mb-6 bg-[#222831] p-4 text-xl ">
        {isAuthenticated && (
          <div className="bg-[#222831]">
            <ul className=" flex space-x-8 bg-[#222831] text-[#00ADB5]  ">
              <NavLink
                to={"/admin"}
                className="text-white hover:text-[#00ADB5]  bg-[#222831]"
              >
                XYZ Banking
              </NavLink>
              <NavLink
                to={"/admin/transaction"}
                className="text-white hover:text-[#00ADB5]  bg-[#222831]"
              >
                Transaction
              </NavLink>
              <NavLink
                to={"/admin/users"}
                className="hover:text-[#00ADB5] text-white bg-[#222831]"
              >
                All Users
              </NavLink>
             
            </ul>
          </div>
        )}
        <ul className="bg-[#222831] mr-7 space-x-9">
          {!isAuthenticated ? (
            <NavLink
              to={"/admin/login"}
              className=" hover:text-[#00ADB5] text-white bg-[#222831]"
            >
              LogIn
            </NavLink>
          ) : (
            <button
              onClick={logOutHandler}
              className=" hover:text-[#00ADB5] text-white bg-[#222831]"
            >
              Logout
            </button>
          )}
        </ul>
      </nav>
      <Outlet />
    </Suspense>
  );
}
