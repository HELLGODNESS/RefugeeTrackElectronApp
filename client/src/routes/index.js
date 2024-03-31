import { useRoutes } from "react-router-dom";
import Layout from "../layout";
import Services from "../pages/Services";
import People from "../pages/People";
import Users from "../pages/Users";

export default function Router() {
  return useRoutes([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "people",
          element: <People />,
        },
        {
          path: "Home",
          element: <></>
          // element: <Home />,
        },
        {
          path: "Services",
          element: <Services />,

        },
        {
          path: "users",
          element: <Users />,
        }
      ]
    },
  ]);
}
