import React, { useState, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Error from "./pages/Error";

import { lightTheme, darkTheme } from "./theme/theme";
import { themeSelector } from "./features/theme/themeSlice";
import { useAppSelector } from "./app/hooks";

function App() {
  const [lightMode, setLightMode] = useState<boolean>(false);

  const selectedTheme = useAppSelector(themeSelector);

  useEffect(() => {
    setLightMode(selectedTheme.lightTheme);
  }, [selectedTheme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
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
    <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
