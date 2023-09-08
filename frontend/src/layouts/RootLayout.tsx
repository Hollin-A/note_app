import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

type Props = {};

const RootLayout = (props: Props) => {
  return (
    <div className="h-screen w-screen bg-light">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
