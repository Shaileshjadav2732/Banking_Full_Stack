import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div className="top-0 py-1 lg:py-2 w-full bg-transparent lg:relative z-50 dark:bg-gray-900">
        <nav className="z-10 sticky top-0 left-0 right-0 max-w-4xl xl:max-w-5xl mx-auto px-5 py-2.5 lg:border-none lg:py-4">
          <div className="flex items-center justify-between">
            <div className="hidden lg:block">
              <ul className="flex space-x-10 text-base font-bold text-black/60 dark:text-white">
                <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </div>
            <div className="hidden lg:flex lg:items-center gap-x-2">
              <button className="flex items-center text-black dark:text-white justify-center px-6 py-2.5 font-semibold">
                <Link to="/signUp">Sign up</Link>
              </button>
              <button className="flex items-center justify-center rounded-md bg-[#4A3BFF] text-white px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200">
                <Link to="/login">Login</Link>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
