import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <React.Fragment>
      RootLayout
      <Outlet />
    </React.Fragment>
  );
};

export default RootLayout;
