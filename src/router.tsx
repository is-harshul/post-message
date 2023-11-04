import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Components
import App from "./App";
import ErrorPage from "./components/Error/ErrorPage";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";

const NavigationWithAppSlot = () => {
  return (
    <>
      <Header />
      <Outlet />
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
    ],
  },
]);


const Router = () => {
  return <RouterProvider router={router} />
};

export default Router;
