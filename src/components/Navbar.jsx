import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { ToastContainer, toast } from "react-toastify";

export default function Navbar() {
  const [logout, setLogOut] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();

  const logOutHandler = (e) => {
    e.preventDefault();
    setLogOut(!logout);
    signOut();
  };

  useEffect(() => {
    {
      if(!isAuthenticated)
         toast.info(" your are LoggedOut !! logIn again for access")
       
    }
  }, [logout]);

  return (
    <>
      <nav className="grid grid-rows-none grid-cols-3 gap-4 h-12 bg-[#222831] text-[#EEEEEE] text-xl p-3">
        <ul className="flex col-span-2 gap-4 bg-[#222831]">
          <li className=" hover:text-[#3c4545] bg-[#222831]">
            <NavLink className="bg-[#222831]" to={"/"}>
              XYZ Banking
            </NavLink>
          </li>
        </ul>
        {!isAuthenticated ? (
          <ul className="flex gap-9 flex-row-reverse mr-3 bg-[#222831]">
            <li className="hover:text-[#00ADB5] bg-[#222831]">
              <NavLink className="bg-[#222831]" to={"/signup"}>
                Sign Up
              </NavLink>
            </li>
            <li className="hover:text-[#00ADB5] bg-[#222831]">
              <NavLink className="bg-[#222831] " to={"/login"}>
                Login
              </NavLink>
            </li>
          </ul>
        ) : (
          <div className="bg-[#222831] space-x-12">
            <NavLink
              to={"/user/transaction"}
              className="text-white hover:text-[#00ADB5]  bg-[#222831]"
            >
              Transaction
            </NavLink>
            <button
              className=" hover:text-[#00ADB5] text-white bg-[#222831] "
              onClick={logOutHandler}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}
