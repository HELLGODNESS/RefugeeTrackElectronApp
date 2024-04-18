import { useRoutes } from "react-router-dom";
import Layout from "../layout";
import Services from "../pages/Services";
import AddPeople from "../pages/AddPeople";
import ViewPeople from "../pages/ViewPeople";
import Home from "../pages/Home";

export default function Router() {
  return useRoutes([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "addPeople",
          element: <AddPeople />,
        },
        {
          path: "Home",
          element: <Home />
          // element: <Home />,
        },
        {
          path: "Services",
          element: <Services />,

        },
        {
          path: "viewPeople",
          element: <ViewPeople />,
        }
      ]
    },
  ]);
}
