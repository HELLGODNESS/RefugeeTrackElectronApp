import { useRoutes } from "react-router-dom";
import Layout from "../layout";
import AddUser from "../components/Pages/AddUser";
import Home from "../components/Pages/Home";
import Services from "../components/Pages/services";

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
        {
          path: "Services",
          element: <Services/>,
        },
      ]

    },
  ]);
}
