import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { themeSelector } from "../features/theme/themeSlice";
import { useAppSelector } from "../app/hooks";

import Box from "@mui/material/Box";
import { blueGrey, grey } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";

import Navbar from "../components/Navbar";

const navbarHeight: string = "68.5px";

type Props = {};

const RootLayout = (props: Props) => {
  const [lightMode, setLightMode] = useState<boolean>(false);

  const selectedTheme = useAppSelector(themeSelector);

  useEffect(() => {
    setLightMode(selectedTheme.lightTheme);
  }, [selectedTheme]);

  return (
    <Box
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        // height: "100vh",
        minHeight: "100vh",
        backgroundColor: lightMode ? blueGrey[50] : grey[800],
      }}
    >
      <Navbar>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </Navbar>
      <div
        style={{
          height: `calc(100vh - ${navbarHeight})`,
        }}
      >
        <Outlet />
      </div>
    </Box>
  );
};

export default RootLayout;
