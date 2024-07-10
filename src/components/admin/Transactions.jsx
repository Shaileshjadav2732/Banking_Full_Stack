import React, { useContext, useEffect, useState } from "react";
import Table from "../Table";
import axios from "axios";
import { Context, server } from "../../main";
import { ToastContainer } from "react-toastify";
export default function Transactions() {

  const { loading, setLoading } = useContext(Context);
  const [tranData, setTranData] = useState([]);

  const fetchFunction = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/admin/transaction`, {
        withCredentials: true,
      });

      setTranData(data.transaction);
      console.log(data.transaction);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunction();
  }, []);



  const data = React.useMemo(() => {
    return tranData.map((tran, index) => ({
      trid:tran._id,
      title:tran.title,
      amount: tran.amount,
      from: tran.senderId,
      to: tran.receiverId,
      date: tran.createdAt,
      status: "Success",
    }));
  }, [tranData]);

 
  const columns = React.useMemo(
    () => [
      { Header: "Sr no.", accessor: (row, index) => index + 1 },
      { Header: "From", accessor: "from" },
      { Header: "To", accessor: "to" },
      { Header: "Title", accessor: "title" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Date", accessor: "date" },
      { Header: "Transaction Id", accessor: "trid" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span style={{ color: value === "Success" ? "green" : "red" }}>
            {value}
          </span>
        ),
      },
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
          <Table data={data} columns={columns} pagination={true} max={5} />
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
