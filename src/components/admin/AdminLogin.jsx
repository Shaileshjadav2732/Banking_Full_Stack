import axios from "axios";
import React, { useContext, useState } from "react";
import { Context, server } from "../../main";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated ,setLoading,loading} = useContext(Context);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setIsAuthenticated(false)
      const { data } = await axios.post(
        `${server}/admin/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      await toast.promise(Promise.resolve(toast.success(data.message)), {
        onClose: () => "",
      });
      console.log(data)
      setIsAuthenticated(true)
      setLoading(false);

      navigate("/admin")

    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false)
      setLoading(false)
    }
  };

  return (
    <>
      {" "}
      <div className="flex justify-center items-center  mt-44">
        <form
          className="bg-[#222831] p-8 shadow-md w-96 rounded-2xl"
          onSubmit={submitHandler}
        >
          {/* Device Details Section */}

          {/* <div className="mb-4 "> */}
          <h1 className="text-4xl tracking-wide font-light uppercase mb-8 text-center bg-[#222831] text-[#EEEEEE]">
            Login
          </h1>

          <input
            type="text"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
          />
           <button
            type="submit"
            disabled={loading}
            className="disabled:bg-[#222831] disabled:text-[#EEEEEE] bg-[#EEEEEE] mt-6 text-[#222831] py-2 px-4 rounded w-full  hover:bg-[#393E46] hover:text-[#EEEEEE]"
          >
            {loading ? "Logging In" : " Login"}
          </button>
          {/* </div> */}
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
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
