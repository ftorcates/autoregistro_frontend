import { ChartData } from "chart.js";

export type User = {
    username: string,
    token: string,
    isAuthenticated: boolean
};

export type RouteType = "PRIVATE" | "PUBLICO" | "INVITADO";

export type Route = {
    path: string,
    component: any,
    routeType: RouteType
};

export type Stream = {
    idStream: string,
    descriptionStream: string
};

export type Error = {
    idStreamErr: string,
    idError: string,
    descriptionError: string
};

export type Summary = {
    idError: string,
    idErrorSummary: string,
    descriptionSummary: string
}

export type Responsable = {
    username: string,
    name: string
}

export type Streams = {
    stream: Stream[]
}

export type Stat = {
    dato: string,
    contador: number
}

export type StatsChartData = {
    data: ChartData,
    title: string
}

export type ChartType = "PIE" | "BAR";