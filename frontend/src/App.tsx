import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

const theme = createTheme({
  palette: {
    primary: blueGrey,
  },
});

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <Signin />,
    errorElement: <div>Error</div>,
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contacts",
        element: <div>contacts</div>,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
