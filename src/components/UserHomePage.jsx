import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { GoHistory } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { fetchUser } from "../https/auth";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function USerHomePage() {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const [user, setUser] = useState({});

  const [showBalance, setShowBalance] = useState(false);

  // State for showing a message after copying the account number
  const [copyMessage, setCopyMessage] = useState("");

  // Function to handle copying the account number to the clipboard
  const handleCopy = (mode) => {
    if (mode === "ACCno") {
      navigator.clipboard.writeText(user._id);
      setCopyMessage("Account number copied!");
    } else {
      navigator.clipboard.writeText(user.upiId);
      setCopyMessage("UPI ID copied!");
    }
    setTimeout(() => setCopyMessage(""), 2000);
  };

  useEffect(() => {
    fetchUser(auth.userId, authHeader, null).then((resData) => {
      setUser(resData.user);
    });
  }, []);

  //   bg-[#222831]
  return (
    <div>
      <div className="shadow-xl shadow-gray-200 mt-3	 flex flex-col m-auto p-8  w-full text-white max-w-sm bg-[#222831] border border-gray-200 rounded-[1.75rem]  dark:bg-gray-800 dark:border-gray-700">
        <span className="bg-[#222831] ">Savings Account {"  "} (Primary)</span>
        <p className="bg-[#222831] mt-2">
          Account Number:
          <span
            className="font-bold bg-[#222831] font-serif text-xl text-white ml-2 cursor-pointer"
            onClick={() => {
              handleCopy("ACCno");
            }}
            title="Copy account number"
          >
            {user._id}
          </span>
        </p>
        <p className="bg-[#222831] mt-2">
          UPI ID:
          <span
            className="font-bold bg-[#222831] font-serif text-xl text-white ml-2 cursor-pointer"
            onClick={() => {
              handleCopy("UPIid");
            }}
            title="Copy account number"
          >
            {user.upiId}
          </span>
        </p>
        <div className="mb-2 bg-[#222831]">
          {copyMessage && (
            <p className=" bg-[#222831] text-[#00ADB5] mt-2">{copyMessage}</p>
          )}
        </div>

        <div className="bg-[#222831] flex">
          {!showBalance && (
            <span className="bg-[#222831] mt-4 text-2xl">₹XXXXXX</span>
          )}
          {showBalance && (
            <span className="bg-[#222831] mt-3 font-serif text-3xl">
              ₹{user.wallet.toFixed(2)}
            </span>
          )}
          {showBalance && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowBalance(!showBalance);
              }}
              className="bg-[#222831] ml-5 mt-[0.80rem]"
            >
              <BiSolidHide fill="white" className="bg-[#222831]  h-8 w-8" />
            </button>
          )}
          {!showBalance && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowBalance(!showBalance);
              }}
              className="relative  bg-[#222831] ml-5 mt-[0.80rem]"
            >
              <BiSolidShow fill="white" className="bg-[#222831] h-8 w-8" />
            </button>
          )}
        </div>
        <span className="bg-[#222831] mt-3 ">Available Balance</span>
      </div>

      <div className="flex  space-x-40 justify-center items-center mt-32">
        <NavLink to={"/user/transaction"}>
          <button className="flex items-center p-4 rounded-xl hover:bg-[#393E46] bg-[#222831] text-white">
            <GrTransaction
              fill="white"
              className="bg-[#222831]  hover:bg-[#393E46] h-8 mr-2 w-8"
            />{" "}
            Make Transaction{" "}
          </button>
        </NavLink>
        <NavLink to={"/user/history"}>
          <button className="p-4 flex rounded-xl items-center bg-[#222831] hover:bg-[#393E46] text-white">
            <GoHistory
              fill="white"
              className="bg-[#222831] hover:bg-[#393E46] h-8 mr-2 w-8"
            />{" "}
            Transaction History
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default USerHomePage;
