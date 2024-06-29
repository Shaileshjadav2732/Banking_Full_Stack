// src/components/HomePage.js
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gray-800 h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto py-12 ">
        {/* Hero Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Welcome to Your Banking Portal
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Manage your finances with ease and security.
          </p>
         
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Secure Transactions
            </h3>
            <p className="text-gray-600">
              Your transactions are encrypted and secure.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Get help whenever you need it, day or night.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Easy Banking
            </h3>
            <p className="text-gray-600">
              Manage your finances with our intuitive interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
