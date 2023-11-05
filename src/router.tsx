import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Components
import App from "./App";
import ErrorPage from "./components/Error/ErrorPage";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Redirector from "./components/Redirector/Redirector";
import PostPaymentRedirect from "./components/PostPaymentRedirect/PostPaymentRedirect";
// import ListenerApp from "./components/ListenerApp/ListenerApp";

const NavigationWithAppSlot = () => {
  return (
    <>
      <Header />

      {/* UI Slot for the app 👇 */}
      <Outlet />

      {/* <ListenerApp /> */}
    </>
  )
}

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
  return <RouterProvider router={router} />
};

export default Router;
