import React, { useContext, useEffect, useState } from "react";
import Table from "../Table";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Context, server } from "../../main";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";

export default function Users() {
  const { loading, setLoading } = useContext(Context);

  const [userData, setUserData] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const fetchFunction = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/admin/allusers`, {
        withCredentials: true,
      });

      setUserData(data.users);

      const imageUrls = data.users.map((user) => {
        return `http://localhost:5000/${user.image}`;
      });

      setImageUrl(imageUrls);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunction();
  }, []);

  const deleteHandler = async (user) => {
    try {
      const { data } = await axios.delete(
        `${server}/admin/deleteuser`,
        { data: { _id: user._id } },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      await fetchFunction(); // Fetch updated user data after deletion
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const data = React.useMemo(() => {
    return userData.map((user, index) => ({
      photo: <img src={imageUrl[index]} className="h-24 w-24 object-cover" />,
      name: user.name,
      bank: user.bank,
      wallet: user.wallet,
      account: user._id,
      mobile: user.phone,
      email: user.email,
      dob: user.dob,
      transaction: (
        <NavLink
          to={`/admin/transaction/${user._id}`}
          className="text-blue-700 hover:underline"
        >
          Transaction
        </NavLink>
      ),
      address: user.address,

      remove: (
        <button onClick={() => deleteHandler(user)}>
          <MdDelete fill="red" className="h-8 w-8 ml-5" />
        </button>
      ),
    }));
  }, [userData, imageUrl]);

  const columns = React.useMemo(
    () => [
      { Header: "Sr no.", accessor: (row, index) => index + 1 },

      {
        Header: "Photo",
        accessor: "photo",
      },
      { Header: "Name", accessor: "name" },
      { Header: "Bank", accessor: "bank" },
      { Header: "Wallet", accessor: "wallet" },
      { Header: "Account Number", accessor: "account" },
      { Header: "Mobile Number", accessor: "mobile" },
      { Header: "Email", accessor: "email" },
      { Header: "DOB", accessor: "dob" },
      { Header: "Address", accessor: "address" },
      { Header: " Transaction", accessor: "transaction" },
      { Header: "Remove", accessor: "remove" },

      // Add more columns as needed
    ],
    []
  );
  return (
    <>
      <div>
        {loading ? (
          "loading data..."
        ) : (
          <Table data={data} columns={columns} pagination={true} max={2} />
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
      />
    </>
  );
}
