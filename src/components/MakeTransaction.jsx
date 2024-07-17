import { Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { genreateSignature, makeTransaction } from "../https/transaction";
import { encryptData } from "../utils/encrypt";
import { fetchKeyPairs, fetchUser } from "../https/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function MakeTransaction() {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const [activeTab, setActiveTab] = useState("accountNo");

  const [keyPairs, setKeyPairs] = useState({
    publicKey: "",
    privateKey: "",
  });

  const [signature, setSignature] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPairsOfKey() {
      try {
        const objectOfKeyPairs = await fetchKeyPairs();
        setKeyPairs(objectOfKeyPairs);
        const generateSignature = await genreateSignature(
          { senderId: auth.userId, privateKey: objectOfKeyPairs.privateKey },
          authHeader
        );
        setSignature(generateSignature.signature);
      } catch (error) {
        console.log(error);
        throw new Error("Could not genreate signature and keypairs!");
      }
    }
    fetchPairsOfKey();
  }, []);

  const changePaymentMethod = (method) => {
    method === "account" ? setActiveTab("accountNo") : setActiveTab("phoneNo");
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);

    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries());
    data.acquisition = acquisitionChannel;

    let finalData;

    const encryptPin = encryptData(data.upipin);

    if (data.AcoountNumber) {
      if (data.AcoountNumber.length !== 11) {
        toast.error("Invalid Account Number!");
        throw new Error("Invalid Account Number!");
      }
      if (data.AcoountNumber === auth.userId) {
        toast.error("Can't send money to your Account No!");
        throw new Error("Can't send money to your Account No");
      }
      finalData = {
        publicKey: keyPairs.publicKey,
        signature: signature,
        senderId: auth.userId,
        acNo: data.AcoountNumber,
        upiPin: encryptPin,
        title: data.title,
        amount: data.amount,
      };
    }

    if (data.mobileNumber) {
      if (
        !data.mobileNumber.includes("@xyzbanking") ||
        data.mobileNumber.length !== 21
      ) {
        toast.error("Invalid UPI ID!");
        throw new Error("Invalid UPI ID");
      }
      const extractedMobileNumber = Number(data.mobileNumber.split("@")[0]);
      console.log(extractedMobileNumber);
      const user = await fetchUser(auth.userId, authHeader, null);

      if (user.user.phone === Number(extractedMobileNumber)) {
        toast.error("Can't send money to your UPI ID!");
        throw new Error("Can't send money to your phone No");
      }

      finalData = {
        publicKey: keyPairs.publicKey,
        signature: signature,
        senderId: auth.userId,
        phone: extractedMobileNumber,
        upiPin: encryptPin,
        title: data.title,
        amount: data.amount,
      };
      console.log(finalData);
    }

    makeTransaction(finalData, authHeader)
      .then((resData) => {
        console.log(resData);
      })
      .then(() => {
        navigate("/user/history");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="mt-10 ml-10">
        <Button
          className={` ${
            activeTab === "accountNo"
              ? "bg-[#222831] text-[#EEEEEE]  hover:bg-[#393E46]"
              : ""
          }  mr-4 `}
          variant="text"
          onClick={() => {
            changePaymentMethod("account");
          }}
        >
          Using Account No
        </Button>
        <Button
          className={` ${
            activeTab === "phoneNo"
              ? "bg-[#222831] text-[#EEEEEE]  hover:bg-[#393E46]"
              : ""
          }   `}
          variant="text"
          onClick={() => {
            changePaymentMethod("phone");
          }}
        >
          Using UPI ID
        </Button>

        {/* Form */}
        <div className="flex justify-center items-center  mt-1 mr-14">
          <Card className="w-full max-w-[48rem] flex-row">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody className="bg-[#222831] rounded-r-xl">
              {activeTab === "accountNo" ? (
                <form onSubmit={submitHandler} className="bg-[#222831] p-8 ">
                  <h1 className="text-4xl tracking-wide font-light  mb-8 text-center bg-[#222831] text-[#EEEEEE]">
                    Using AccountNo
                  </h1>
                  <input
                    type="text"
                    name="AcoountNumber"
                    required
                    placeholder="Account Number"
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Enter your name as per bank"
                    required
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                  <input
                    type="text"
                    name="ifscCode"
                    placeholder="IFSC Code"
                    required
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                  <input
                    type="password"
                    name="upipin"
                    placeholder="Enter your six digit PIN"
                    required
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount in ₹"
                    required
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                  <button
                    type="submit"
                    className="bg-[#EEEEEE] mt-6 text-[#222831] py-2 px-4 rounded w-full  hover:bg-[#393E46] hover:text-[#EEEEEE]"
                  >
                    Send Money
                  </button>
                  {/* </div> */}
                </form>
              ) : (
                <form onSubmit={submitHandler} className="bg-[#222831] p-8 ">
                  <h1 className="text-4xl tracking-wide font-light  mb-8 text-center bg-[#222831] text-[#EEEEEE]">
                    Using UPI ID
                  </h1>
                  <input
                    type="text"
                    name="mobileNumber"
                    required
                    placeholder="UPI ID"
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                  <input
                    type="password"
                    name="upipin"
                    placeholder="Enter your six digit PIN"
                    required
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount in ₹"
                    required
                    className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
                  />
                  <button
                    type="submit"
                    className="bg-[#EEEEEE] mt-6 text-[#222831] py-2 px-4 rounded w-full  hover:bg-[#393E46] hover:text-[#EEEEEE]"
                  >
                    Send Money
                  </button>
                  {/* </div> */}
                </form>
              )}
            </CardBody>
          </Card>
        </div>
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
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}
