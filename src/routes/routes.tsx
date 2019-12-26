import Dashboard from "../layouts/Dashboard";
import Login from "../views/Login"
import DashboardPage from "../views/DashboardPage"
import { RouteProps } from "react-router";

interface RouteInterface extends RouteProps {
  path: string
  component?: any
  routes?: RouteInterface[]
  redirect?: boolean
  to?: string
}

const routes: RouteInterface[] = [
    {
        path: "/login",
        component: Login,
        exact: true,
    
    },
    {
        path: "",
        component: Dashboard,
        exact: true,
        routes: [
            {
                path: "/dashboard",
                component: DashboardPage,
                exact: true
            },
            { redirect: true, 
                path: "", 
                to: "/dashboard",
            }

        ]
    }
];

export default routes;
