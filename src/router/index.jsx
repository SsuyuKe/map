import { createBrowserRouter } from "react-router-dom";
import { Home, LoginPage, ShortList } from "../pages";
import { NotFound } from "../pages"
import Layout from "../components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/shortlist",
        element: <ShortList />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;