import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import App from "./App";
import ErrorPage from "./components/Error/ErrorPage";
import Contact from "./components/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts/",
    element: <Contact />,
    errorElement: <ErrorPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
