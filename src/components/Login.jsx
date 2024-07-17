import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { fetchUser, login } from "../https/auth";

import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function LogIn({ loginHandler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useContext(Context);

  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const signIn = useSignIn();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    login({ email: email, password: password })
      .then((resData) => {
        signIn({
          auth: {
            token: resData.token,
            type: "Bearer",
          },
          userState: { userId: resData.userId },
        });
        console.log(resData);
        setLoading(false);
      })
      .then(() => {
        fetchUser(null, authHeader, email).then((resData) => {
          if (
            resData.user.name === null ||
            resData.user.address === null ||
            resData.user.dob === null ||
            resData.user.bank === null ||
            resData.user.upipin === null  ||
            resData.user.image === null
          ) {
            navigate("/user/editprofile");
          } else {
            navigate("/user/profile");
          }
        });
      })
      .catch((err) => {
        toast.error("user data not found");
        console.log(err);
        setLoading(false)
      });
  };

  return (
    <>
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
            value={password}
            placeholder="Password"
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