import ConsultaReport from "../Pages/ConsultaReport";
import EditReport from "../Pages/EditReport";
import Errors from "../Pages/Errors";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import MyReports from "../Pages/MyReports";
import PruebaExcel from "../Pages/PruebaExcel";
import Register from "../Pages/Register";
import Reports from "../Pages/Reports";
import SearchReports from "../Pages/SearchReports";
import Stats from "../Pages/Stats";
import Summaries from "../Pages/Summaries";
import User from "../Pages/User";
import { Route } from "../types";

const routes: Route[] = [
    {
        path: "/",
        component: Login,
        routeType: "INVITADO"
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
        path: "/createError",
        component: Errors,
        routeType: "PRIVATE"
    }, 
    {
        path: "/createSummary",
        component: Summaries,
        routeType: "PRIVATE"
    }, 
    {
        path: "/createReport",
        component: Reports,
        routeType: "PRIVATE"
    }, 
    {
        path: "/myReports",
        component: MyReports,
        routeType: "PRIVATE"
    },
    {
        path: "/consultaReport/:id",
        component: ConsultaReport,
        routeType: "PRIVATE"
    },
    {
        path: "/search",
        component: SearchReports,
        routeType: "PRIVATE"
    },
    {
        path: "/stats",
        component: Stats,
        routeType: "PRIVATE"
    },
    {
        path: "/pruebaExcel",
        component: PruebaExcel,
        routeType: "PRIVATE"
    },
    {
        path: "/editReport/:id",
        component: EditReport,
        routeType: "PRIVATE"
    },

]

export default routes;