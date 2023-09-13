import React, { useState, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";

const theme = createTheme({
  palette: {
    primary: blueGrey,
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <div>Error</div>,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/sign-in",
          element: <Signin />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
