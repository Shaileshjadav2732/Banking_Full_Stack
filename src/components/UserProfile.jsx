import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import Table from "./Table";
import { GoHistory } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { fetchUser } from "../https/auth";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const UserProfile = () => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const [userDetails, setUserDetails] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [DOB, setDOB] = useState("");

  useEffect(() => {
    fetchUser(auth.userId, authHeader, null)
      .then((resData) => {
        setUserDetails(resData.user);
        setImageUrl("http://localhost:5000/" + resData.user.image);
        setDOB(resData.user.dob.split("T")[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fileInputRef = useRef(null);
  const tableRef = useRef(null);
  const handleButtonClick = () => {
    // Trigger a click on the hidden file input element
    fileInputRef.current.click();
  };

  const data = React.useMemo(
    () => [
      {
        type: "Received",
        name: "John",
        amount: "10000",
        date: "30/03/2024",
        time: "5:07 PM",
      },
      {
        type: "Send",
        name: "Valay",
        amount: "5000",
        date: "12/03/2024",
        time: "4:06 AM",
      },
      // Add more data as needed
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: "Sr no.", accessor: "srno" },

      { Header: "Type", accessor: "type" },
      { Header: "Name", accessor: "name" },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value, row }) => (
          <span
            style={{
              color: row.original.type === "Received" ? "green" : "red",
            }}
          >
            {value}
          </span>
        ),
      },
      { Header: "Date", accessor: "date" },
      { Header: "Time", accessor: "time" },
      // Add more columns as needed
    ],
    []
  );

  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (showHistory && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showHistory]);

  const handleShowHistoryClick = () => {
    setShowHistory(true);
  };

  return (
    <>
      <div className="rounded-xl max-w-sm mx-auto  overflow-hidden shadow-xl">
        <div className="text-center p-10 align-middle my-4 rounded-xl">
          <img
            className="h-52 w-52 m-auto  rounded-[50%] object-cover object-center"
            src={imageUrl}
            alt="Profile Pic"
          />

          <h3 className="font-serif uppercase mt-3 font-bold text-2xl text-gray-800 dark:text-white mb-1">
            {userDetails.name}
          </h3>
        </div>

        <div className="sm:divide-y sm:divide-gray-200 rounded-xl ">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <span className="text-sm font-medium text-gray-500">Bank</span>
            <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userDetails.bank}
            </span>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <span className="text-sm font-medium text-gray-500">Ac no.</span>
            <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userDetails._id}
            </span>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <span className="text-sm font-medium text-gray-500">UPI ID</span>
            <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userDetails.upiId}
            </span>
          </div>

          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <span className="text-sm font-medium text-gray-500">
              Email address
            </span>
            <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userDetails.email}
            </span>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <span className="text-sm font-medium text-gray-500">
              Phone number
            </span>
            <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userDetails.phone}
            </span>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <span className="text-sm font-medium text-gray-500">Address</span>
            <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userDetails.address}
            </span>
          </div>
          <div className="py-3 mb-8 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <span className="text-sm font-medium text-gray-500">
              {" "}
              Date Of Birth
            </span>
            <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {DOB}
            </span>
          </div>
        </div>
      </div>
      {/* <button
        onClick={handleShowHistoryClick}
        className="m-auto mt-12 p-2 flex rounded-xl items-center bg-[#222831] hover:opacity-80 text-white"
      >
        <GoHistory
          fill="white"
          className="bg-[#222831] hover:bg-[#393E46] h-4 mr-2 w-4"
        />
        Show Recent Transaction
      </button>
      {showHistory && (
        <div ref={tableRef}>
          <Table columns={columns} data={data} max={2} />
        </div>
      )}
      {showHistory && (
        <NavLink to={"/user/history"}>
          <button className="m-auto  p-2 flex rounded-xl items-center  hover:opacity-80 text-[#222831]">
            Read More..
          </button>
        </NavLink>
      )} */}
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
};

export default UserProfile;
