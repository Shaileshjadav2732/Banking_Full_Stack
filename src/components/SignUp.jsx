import React, { useContext, useState } from "react";
import { startRegister, verifyEmail, verifySign } from "../https/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";

function SignUp({ keyPairs }) {
  const [showOtpVer, setShowOptVer] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const { loading, setLoading } = useContext(Context);

  const navigate = useNavigate();

  const submitHandlerRegister = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);

    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries());
    data.acquisition = acquisitionChannel;

    setEmail(data.email);

    const finalData = {
      deviceDetails: {
        id: data.deviceId,
        os: data.os,
        version: data.version,
        manufacturer: data.manufacturer,
        model: data.model,
      },
      email: data.email,
      phoneNo: data.phone,
      password: data.password,
      privateKey: keyPairs.privateKey,
    };

    try {
      setLoading(true);
      const startRegRes = await startRegister(finalData);
      const signature = startRegRes.data.signature;
      setUserId(startRegRes.data.userId);

      // verification of data using digital signature
      await verifySign({
        phoneNo: data.phone,
        signature: signature,
        publicKey: keyPairs.publicKey,
      });
      setShowOptVer(true);
      // toast.success("otp send");
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const submitHandlerOtp = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries());
    data.acquisition = acquisitionChannel;

    try {
      const resOfOtpVerification = await verifyEmail({
        otp: data.otp,
        userId: userId,
      })
        .then(() => {
          toast.success("Your Email Verfied Successfully!");
        })
        .then(() => {
          setTimeout(() => {
            navigate("/user/editprofile");
          }, 3000);
        });
    } catch (err) {
      console.log(err);
      toast.error("some error occured in verification!");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-9 ">
        <div className=" p-8 shadow-md w-96 rounded-2xl bg-[#222831] text-[#EEEEEE]">
          <form onSubmit={submitHandlerRegister} className="bg-[#222831]">
            {/* Device Details Section */}
            {!showOtpVer && (
              <div className="mb-4 bg-[#222831]">
                <h1 className="text-4xl tracking-wide font-light uppercase mb-8 text-center bg-[#222831] text-[#EEEEEE]">
                  Registration
                </h1>
                <h2 className="text-lg mb-2 bg-[#222831] text-[#EEEEEE]">
                  Device Details
                </h2>
                <input
                  type="text"
                  name="deviceId"
                  required
                  placeholder="Device ID"
                  className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                />
                <input
                  type="text"
                  name="os"
                  placeholder="OS"
                  required
                  className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                />
                <input
                  type="text"
                  name="version"
                  placeholder="Version"
                  required
                  className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                />
                <input
                  type="text"
                  name="manufacturer"
                  required
                  placeholder="Manufacturer"
                  className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Model"
                  className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  required
                />
              </div>
            )}

            {/* Personal Details Section */}
            {!showOtpVer && (
              <div className="bg-[#222831] text-[#EEEEEE]">
                <div className="mb-4 bg-[#222831] text-[#EEEEEE]">
                  <h2 className="text-lg  mb-2 bg-[#222831] text-[#EEEEEE]">
                    Personal Details
                  </h2>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                  <input
                    type="number"
                    name="phone"
                    required
                    placeholder="Moblie Number"
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                  <input
                    type="password"
                    required
                    name="password"
                    placeholder="Password(8 Characters)"
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                </div>
                {/* GetOtp Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="disabled:bg-[#222831] disabled:text-[#EEEEEE] bg-[#EEEEEE] text-[#222831]  py-2 px-4 rounded w-full hover:bg-[#393E46] hover:text-[#EEEEEE]"
                >
                  {loading ? "Sending your otp" : "Get OTP"}
                </button>
              </div>
            )}
          </form>
          {/* Otp Verificartion */}

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
        </div>
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

export default SignUp;
