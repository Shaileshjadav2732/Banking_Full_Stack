import React from "react";


export default function EditProfile() {
  return (
    <div className="flex justify-center items-center mt-9 ">
      <div className=" p-8 shadow-md w-96 rounded-2xl bg-[#222831] text-[#EEEEEE]">
        <form className="bg-[#222831]" onSubmit={submitHandler}>
          <div className="mb-4 bg-[#222831]">
            <h1 className="text-3xl tracking-wide font-light uppercase mb-8 text-center bg-[#222831] text-[#EEEEEE]">
              Complete Profile{" "}
            </h1>

            <label className="text-white font-thin bg-[#222831]">
              Profile Photo
            </label>
            <input
              type="file"
              name="image"
              required
              className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
            />
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
            />
            <label className="text-white font-thin bg-[#222831]">
              Date Of Birth
            </label>
            <input
              type="date"
              placeholder="Date Of Birth"
              name="dob"
              required
              className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
            />
            <select
              type="text"
              name="bank"
              placeholder="Enter your bank name"
              required
              className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
            >
              <option
                disabled
                selected
                value
                className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
              >
                select your bank
              </option>
              <option
                value="SBI"
                className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
              >
                SBI
              </option>
              <option
                value="HDFC"
                className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
              >
                HDFC
              </option>
              <option
                value="ICICI"
                className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
              >
                ICICI
              </option>
              <option
                value="BOB"
                className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
              >
                BOB
              </option>
            </select>

            <input
              type="password"
              name="upipin"
              required
              placeholder="Upi Pin(6 Digit)"
              className="border p-2 w-full mb-2 bg-[#222831] text-[#EEEEEE]"
            />
          </div>

          {/* Personal Details Section */}
          <div>
            <button
              type="submit"
              className="disabled:bg-[#222831] disabled:text-[#EEEEEE] bg-[#EEEEEE] text-[#222831]  py-2 px-4 rounded w-full hover:bg-[#393E46] hover:text-[#EEEEEE]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
