import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import App from "./App";
import ErrorPage from "./components/Error/ErrorPage";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Redirector from "./components/Redirector/Redirector";
import PostPaymentRedirect from "./components/PostPaymentRedirect/PostPaymentRedirect";

const NavigationWithAppSlot = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationWithAppSlot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "contacts/",
        element: <Contact />,
      },
      {
        path: "redirector/",
        element: <Redirector />,
      },
      {
        path: "redirectApp/",
        element: <PostPaymentRedirect />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
