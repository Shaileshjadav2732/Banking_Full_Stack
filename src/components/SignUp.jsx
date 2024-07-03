import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../main";
import { ToastContainer, toast } from "react-toastify";
import { verifyEmail ,startRegister} from "../http/auth";
import { Navigate, useNavigate } from "react-router-dom";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const { loading, setLoading } = useContext(Context);
  const [showOtpVer, setShowOptVer] = useState(false);
  const formObj = {};

  const navigate = useNavigate();

  const registerHandler = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    console.log(fd);

    fd.forEach((value, key) => {
      formObj[key] = value;
    });
    console.log(formObj);
    setEmail(formObj.email);
    console.log(email);
    const finalData = {
      deviceDetails: {
        id: formObj.deviceId,
        os: formObj.os,
        version: formObj.version,
        manufacturer: formObj.manufacturer,
        model: formObj.os,
      },
      email: formObj.email,
      phoneNo: formObj.phone,
      password: formObj.password,
      verified: true,
    };

    console.log(finalData);
    try {
      setLoading(true);
      const startRegRes = await startRegister(finalData);

      setShowOptVer(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const verifyOtpHandler = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    console.log(fd);

    fd.forEach((value, key) => {
      formObj[key] = value;
    });

    try {
      await verifyEmail({ otp: formObj.otp, email: formObj.email })
        .then(() => {
          toast.success("your email verified successfully");
        })
        .then(() =>
          setTimeout(() => {  
            navigate("/api/v1/users/completeProfile");
          },3000)
        );
    } catch (error) {}
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="bg-white dark:bg-gray-600 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-8">
          Registration
        </h1>
        {!showOtpVer && (
          <form onSubmit={registerHandler}>
            <div className="mb-6">
              <h2 className="text-lg font-m edium text-gray-700 dark:text-gray-300 mb-4">
                Device Details
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="deviceId"
                  required
                  placeholder="Device ID"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                />
                <input
                  type="text"
                  name="os"
                  required
                  placeholder="Operating System"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                />
                <input
                  type="text"
                  name="version"
                  required
                  placeholder="Version"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                />
                <input
                  type="text"
                  name="manufacturer"
                  required
                  placeholder="Manufacturer"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                />
                <input
                  type="text"
                  name="model"
                  required
                  placeholder="Model"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
            </div>

            {/* Personal Details Section */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                Personal Details
              </h2>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                />
                <input
                  type="number"
                  name="phone"
                  required
                  placeholder="Mobile Number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                />
                <input
                  type="password"
                  required
                  name="password"
                  placeholder="Password (8 Characters)"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        )}

        {showOtpVer && (
          <div className="mb-4 w-[100%] bg-[#222831] ">
            <form onSubmit={submitHandlerOtp} className="bg-[#222831]">
              <div className="bg-[#222831]">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowOptVer(false);
                  }}
                >
                  <span>
                    {" "}
                    <svg
                      height={"1.5rem"}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      stroke="#EEEEEE"
                      className="bg-[#222831]"
                    >
                      <path
                        d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
                        data-name="4-Arrow Left"
                      />
                    </svg>
                  </span>
                </button>
                <span className="text-xl ml-8 relative top-[-0.5rem] font-semibold mb-2 text-center text-[#EEEEEE] bg-[#222831]">
                  Email OTP Verification
                </span>
                <input
                  type="text"
                  name="otp"
                  required
                  placeholder="Enter OTP"
                  className="border p-4 w-full mt-4 mb-4 bg-[#222831] text-[#EEEEEE]"
                />
                <span className="font-extralight text-sm font-sans mr-4 bg-[#222831] text-[#EEEEEE]">
                  Otp Send to this {email}
                </span>

                <div className=" bg-[#222831] text-[#EEEEEE]">
                  <br />
                  <span className="bg-[#222831] text-[#EEEEEE]">
                    Trouble to get otp? we can{" "}
                  </span>
                  <button className="bg-[#222831] text-[#EEEEEE] hover:text-[#00ADB5]">
                    Resend
                  </button>
                </div>
              </div>
              {/* Submit Button  */}
              <button
                type="submit"
                className="bg-[#EEEEEE] text-[#222831] py-2  px-4 rounded w-full mt-7  hover:bg-[#393E46] hover:text-[#EEEEEE]"
              >
                Verify Email
              </button>
            </form>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default SignUp;
