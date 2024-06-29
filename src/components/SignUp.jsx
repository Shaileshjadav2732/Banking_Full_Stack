import React from "react";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="bg-white dark:bg-gray-600 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-8">
          Registration
        </h1>
        <form>
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
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
      </div>
    </div>
  );
};

export default SignUp;
