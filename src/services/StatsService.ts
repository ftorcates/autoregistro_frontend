import axios from "axios";
import { GET_STATS_BY_CATEGORIA_ENDPOINT, GET_STATS_BY_DIAHABIL_ENDPOINT, GET_STATS_BY_ERROR_ENDPOINT, GET_STATS_BY_RESPONSABLE_ENDPOINT, GET_STATS_BY_STREAM_ENDPOINT, GET_STATS_BY_SUMMARY_ENDPOINT, GET_STATS_BY_TIENDA_ENDPOINT, GET_STATS_BY_TURNO_ENDPOINT } from "../utils/endpoints";

export const getStatsByStream = (antiguedad: string) => {
    return axios.get(GET_STATS_BY_STREAM_ENDPOINT(antiguedad));
}

export const getStatsByError = (antiguedad: string) => {
    return axios.get(GET_STATS_BY_ERROR_ENDPOINT(antiguedad));
}

export const getStatsBySummary = (antiguedad: string) => {
    return axios.get(GET_STATS_BY_SUMMARY_ENDPOINT(antiguedad));
}

export const getStatsByTienda = (antiguedad: string) => {
    return axios.get(GET_STATS_BY_TIENDA_ENDPOINT(antiguedad));
}

export const getStatsByCategoria = (antiguedad: string) => {
    return axios.get(GET_STATS_BY_CATEGORIA_ENDPOINT(antiguedad));
}

export const getStatsByResponsable = (antiguedad: string) => {
    return axios.get(GET_STATS_BY_RESPONSABLE_ENDPOINT(antiguedad));
}

export const getStatsByTurno = (antiguedad: string) => {
    return axios.get(GET_STATS_BY_TURNO_ENDPOINT(antiguedad));
}

export const getStatsByDiaHabil = (antiguedad: string) => {
    return axios.get(GET_STATS_BY_DIAHABIL_ENDPOINT(antiguedad));
}