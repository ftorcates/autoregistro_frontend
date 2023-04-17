import { USER_REPORTS_ALL_PER_PAGE, USER_REPORTS_USER_PER_PAGE } from "./constants";

//const API_URL = "http://localhost:80";
//const API_URL = "http://autoregistro-env.eba-sjc2md2g.us-east-1.elasticbeanstalk.com";
const API_URL = "http://encuesta-env.eba-dw3ckfrt.eu-north-1.elasticbeanstalk.com/";

export const REGISTER_ENDPOINT = API_URL + "/users";
export const LOGIN_ENDPOINT = API_URL + "/users/login";
export const GET_USER_ENDPOINT = (username: string) => `${API_URL}/users/${username}`;
export const GET_ALL_USERS_ENDPOINT = API_URL + "/users/findAll";

export const GET_STREAMS_ENDPOINT = API_URL + "/streams";
export const GET_STREAM_BY_ID_ENDPOINT = (id: string) => `${API_URL}/streams/${id}`;

export const CREATE_ERROR_ENDPOINT = API_URL + "/errors";
export const GET_ERROR_BY_ID_ENDPOINT = (id: string) => `${API_URL}/errors/${id}`;
export const GET_ERROR_BY_STREAM_ID_ENDPOINT = (id: string) => `${API_URL}/errors/stream/${id}`;

export const CREATE_SUMMARY_ENDPOINT = API_URL + "/errorSummaries";
export const GET_SUMMARY_BI_ID_ENDPOINT = (id: string) => `${API_URL}/errorSummaries/${id}`;
export const GET_SUMMARY_BY_ERROR_ID_ENDPOINT = (id: string) => `${API_URL}/errorSummaries/error/${id}`;

export const CREATE_REPORT_ENDPOINT = API_URL + "/reports";
export const DELETE_REPORT_ENDPOINT = (id: string) => `${API_URL}/reports/${id}`;
export const GET_REPORT_BY_ID_ENDPOINT = (id: string) => `${API_URL}/reports/${id}`;
export const GET_REPORTS_BY_USERNAME_ENDPOINT = (page: number) => `${API_URL}/reports?page=${page}&limit=${USER_REPORTS_USER_PER_PAGE}`;
export const GET_ALL_REPORTS_ENDPOINT = (page: number) => `${API_URL}/reports/all?page=${page}&limit=${USER_REPORTS_ALL_PER_PAGE}`;
export const GET_LAST_REPORTS_ENDPOINT = API_URL + "/reports/lastReports";
export const GET_MY_REPORTS_ENDPOINT = API_URL + "/reports/myReports";

export const GET_REPORTS_BY_STREAM_AND_DATE_ENDPOINT = (stream: string, antiguedad: string) => `${API_URL}/reports/byStreamAndDate?streamId=${stream}&antiguedad=${antiguedad}`;
export const GET_REPORTS_BY_ERROR_AND_DATE_ENDPOINT = (stream: string, error: string, antiguedad: string) => `${API_URL}/reports/byErrorAndDate?streamId=${stream}&errorId=${error}&antiguedad=${antiguedad}`;
export const GET_REPORTS_BY_SUMMARY_AND_DATE_ENDPOINT = (stream: string, error: string, summary: string, antiguedad: string) => `${API_URL}/reports/bySummaryAndDate?streamId=${stream}&errorId=${error}&summaryId=${summary}&antiguedad=${antiguedad}`;
export const GET_REPORTS_BY_TIENDA_AND_DATE_ENDPOINT = (tienda: string, antiguedad: string) => `${API_URL}/reports/byTiendaAndDate?codigoTienda=${tienda}&antiguedad=${antiguedad}`;
export const GET_REPORTS_BY_ORDER_AND_DATE_ENDPOINT = (orden: string, antiguedad: string) => `${API_URL}/reports/byOrderAndDate?orderId=${orden}&antiguedad=${antiguedad}`;
export const GET_REPORTS_BY_IMEI_AND_DATE_ENDPOINT = (imei: string, antiguedad: string) => `${API_URL}/reports/byImeiAndDate?imei=${imei}&antiguedad=${antiguedad}`;
export const GET_REPORTS_BY_SKU_AND_DATE_ENDPOINT = (sku: string, antiguedad: string) => `${API_URL}/reports/bySkuAndDate?sku=${sku}&antiguedad=${antiguedad}`;
export const GET_REPORTS_BY_DATE_ENDPOINT = (antiguedad: string) => `${API_URL}/reports/byDate?antiguedad=${antiguedad}`;
export const GET_REPORTS_BY_RESPONSABLE_AND_DATE_ENDPOINT = (responsable: string, antiguedad: string) => `${API_URL}/reports/byResponsableAndDate?responsable=${responsable}&antiguedad=${antiguedad}`;

export const GET_COUNT_TOTAL_REPORTS_ENDPOINT = API_URL + "/reports/countTotalReports";
export const GET_COUNT_TODAY_REPORTS_ENDPOINT = API_URL + "/reports/countTodayReports";
export const GET_COUNT_MONTH_REPORTS_ENDPOINT = API_URL + "/reports/countMonthReports";
export const GET_COUNT_MY_REPORTS_ENDPOINT = API_URL + "/reports/countMyReports";

export const GET_STATS_BY_STREAM_ENDPOINT = (antiguedad: string) => `${API_URL}/stats/byStreamAndDate?antiguedad=${antiguedad}`;
export const GET_STATS_BY_ERROR_ENDPOINT = (antiguedad: string) => `${API_URL}/stats/byErrorAndDate?antiguedad=${antiguedad}`;
export const GET_STATS_BY_SUMMARY_ENDPOINT = (antiguedad: string) => `${API_URL}/stats/bySummaryAndDate?antiguedad=${antiguedad}`;
export const GET_STATS_BY_TIENDA_ENDPOINT = (antiguedad: string) => `${API_URL}/stats/byTiendaAndDate?antiguedad=${antiguedad}`;
export const GET_STATS_BY_CATEGORIA_ENDPOINT = (antiguedad: string) => `${API_URL}/stats/byCategoriaAndDate?antiguedad=${antiguedad}`;
export const GET_STATS_BY_RESPONSABLE_ENDPOINT = (antiguedad: string) => `${API_URL}/stats/byResponsableAndDate?antiguedad=${antiguedad}`;
export const GET_STATS_BY_TURNO_ENDPOINT = (antiguedad: string) => `${API_URL}/stats/byTurnoAndDate?antiguedad=${antiguedad}`;
export const GET_STATS_BY_DIAHABIL_ENDPOINT = (antiguedad: string) => `${API_URL}/stats/byDiaHabilAndDate?antiguedad=${antiguedad}`;