import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
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
    <RouterProvider
      router={router}
      // fallbackElement={<React.Fragment>Loading ...</React.Fragment>}
    />
  );
}

export default App;
