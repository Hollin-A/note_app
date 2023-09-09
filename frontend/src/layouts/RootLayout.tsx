import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { blueGrey } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";

import Navbar from "../components/Navbar";

type Props = {};

const RootLayout = (props: Props) => {
  return (
    <Box
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        // height: "100vh",
        // maxHeight: "100vh",
        backgroundColor: blueGrey[50],
      }}
    >
      <Navbar>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </Navbar>
      <Outlet />
    </Box>
  );
};

export default RootLayout;
