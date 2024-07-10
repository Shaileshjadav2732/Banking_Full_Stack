import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Suspense } from "react";
import Loader from "./Loader";

export default function Root() {
  return (
    <div>
      <Suspense fallback={<Loader/>}>
        <Navbar />
        <Outlet />
      </Suspense>
    </div>
  );
}
