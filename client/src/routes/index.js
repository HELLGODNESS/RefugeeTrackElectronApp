import { useRoutes } from "react-router-dom";
import Layout from "../layout";
import AddUser from "../components/Pages/AddUser";
import Home from "../components/Pages/Home";

export default function Router() {
  return useRoutes([
    {
      path: "",
      element: <Layout />,

      children: [
        {
          path: "addUser",
          element: <AddUser />,
        },
        {
          path: "Home",
          element: <Home />,
        },
      ]

    },
  ]);
}
