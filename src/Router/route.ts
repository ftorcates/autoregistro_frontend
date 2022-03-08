import CreatePoll from "../Pages/CreatePoll";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import User from "../Pages/User";
import { Route } from "../types";

const routes: Route[] = [
    {
        path: "/",
        component: Home,
        routeType: "PUBLICO"
    },
    {
        path: "/login",
        component: Login,
        routeType: "INVITADO"
    },
    {
        path: "/register",
        component: Register,
        routeType: "INVITADO"
    }, 
    {
        path: "/user",
        component: User,
        routeType: "PRIVATE"
    },
    {
        path: "/createPoll",
        component: CreatePoll,
        routeType: "PRIVATE"
    }
]

export default routes;