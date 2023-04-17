import axios from "axios";
import { CREATE_REPORT_ENDPOINT, DELETE_REPORT_ENDPOINT, GET_ALL_REPORTS_ENDPOINT, GET_COUNT_MONTH_REPORTS_ENDPOINT, GET_COUNT_MY_REPORTS_ENDPOINT, GET_COUNT_TODAY_REPORTS_ENDPOINT, GET_COUNT_TOTAL_REPORTS_ENDPOINT, GET_LAST_REPORTS_ENDPOINT, GET_MY_REPORTS_ENDPOINT, GET_REPORTS_BY_DATE_ENDPOINT, GET_REPORTS_BY_ERROR_AND_DATE_ENDPOINT, GET_REPORTS_BY_IMEI_AND_DATE_ENDPOINT, GET_REPORTS_BY_ORDER_AND_DATE_ENDPOINT, GET_REPORTS_BY_RESPONSABLE_AND_DATE_ENDPOINT, GET_REPORTS_BY_SKU_AND_DATE_ENDPOINT, GET_REPORTS_BY_STREAM_AND_DATE_ENDPOINT, GET_REPORTS_BY_SUMMARY_AND_DATE_ENDPOINT, GET_REPORTS_BY_TIENDA_AND_DATE_ENDPOINT, GET_REPORTS_BY_USERNAME_ENDPOINT, GET_REPORT_BY_ID_ENDPOINT } from "../utils/endpoints";

export const registrarReport = (data: any) =>  {
    return axios.post(CREATE_REPORT_ENDPOINT, data);
}

export const deleteReport = (id: string) => {
    return axios.delete(DELETE_REPORT_ENDPOINT(id));
}

export const getReportsByUsername = (page: number) => {
    return axios.get(GET_REPORTS_BY_USERNAME_ENDPOINT(page));
}

export const getAllReports = (page: number) => {
    return axios.get(GET_ALL_REPORTS_ENDPOINT(page));
}

export const getReportById = (id: string) => {
    return axios.get(GET_REPORT_BY_ID_ENDPOINT(id));
}

export const getLastReports = () => {
    return axios.get(GET_LAST_REPORTS_ENDPOINT);
}

export const getMyReports = () => {
    return axios.get(GET_MY_REPORTS_ENDPOINT);
}

export const getReportsByStreamAndDate = (stream: string, antiguedad: string) => {
    return axios.get(GET_REPORTS_BY_STREAM_AND_DATE_ENDPOINT(stream, antiguedad));
}

export const getReportsByErrorAndDate = (stream: string, error: string, antiguedad: string) => {
    return axios.get(GET_REPORTS_BY_ERROR_AND_DATE_ENDPOINT(stream, error, antiguedad));
}

export const getReportsBySummaryAndDate = (stream: string, error: string, summary: string, antiguedad: string) => {
    return axios.get(GET_REPORTS_BY_SUMMARY_AND_DATE_ENDPOINT(stream, error, summary, antiguedad));
}

export const getReportsByTiendaAndDate = (codigoTienda: string, antiguedad: string) => {
    return axios.get(GET_REPORTS_BY_TIENDA_AND_DATE_ENDPOINT(codigoTienda, antiguedad));
}

export const getReportsByOrderAndDate = (order: string, antiguedad: string) => {
    return axios.get(GET_REPORTS_BY_ORDER_AND_DATE_ENDPOINT(order, antiguedad));
}

export const getReportsByImeiAndDate = (imei: string, antiguedad: string) => {
    return axios.get(GET_REPORTS_BY_IMEI_AND_DATE_ENDPOINT(imei, antiguedad));
}

export const getReportsBySkuAndDate = (sku: string, antiguedad: string) => {
    return axios.get(GET_REPORTS_BY_SKU_AND_DATE_ENDPOINT(sku, antiguedad));
}

export const getReportsByDate = (antiguedad: string) => {
    return axios.get(GET_REPORTS_BY_DATE_ENDPOINT(antiguedad));
}

export const getReportsByResponsableAndDate = (responsable: string, antiguedad: string) => {
    return axios.get(GET_REPORTS_BY_RESPONSABLE_AND_DATE_ENDPOINT(responsable, antiguedad));
}

export const getCountTotalReports = () => {
    return axios.get(GET_COUNT_TOTAL_REPORTS_ENDPOINT);
}

export const getCountTodayReports = () => {
    return axios.get(GET_COUNT_TODAY_REPORTS_ENDPOINT);
}

export const getCountMonthReports = () => {
    return axios.get(GET_COUNT_MONTH_REPORTS_ENDPOINT);
}

export const getCountMyReports = () => {
    return axios.get(GET_COUNT_MY_REPORTS_ENDPOINT);
}