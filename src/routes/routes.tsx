import Dashboard from "../layouts/Dashboard";
import Login from "../views/Login"
import DashboardPage from "../views/DashboardPage"
import { RouteProps } from "react-router";

interface RouteInterface extends RouteProps {
  path: string
  component: any
  routes?: RouteInterface[]
}

const routes: RouteInterface[] = [
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/",
    component: Dashboard,
    routes: [
      {
        path: "/dashboard",
        component: DashboardPage,

      },
    ]
  }
];

export default routes;
