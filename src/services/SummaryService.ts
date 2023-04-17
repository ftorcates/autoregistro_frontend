import axios from "axios";
import { CREATE_SUMMARY_ENDPOINT, GET_SUMMARY_BI_ID_ENDPOINT, GET_SUMMARY_BY_ERROR_ID_ENDPOINT } from "../utils/endpoints";

export const registrarSummary = (data: any) =>  {
    return axios.post(CREATE_SUMMARY_ENDPOINT, data);
}

export const getSummariesByErrorId = (id: string) => {
    return axios.get(GET_SUMMARY_BY_ERROR_ID_ENDPOINT(id));
}

export const getErrorSummaryById = (id: string) => {
    return axios.get(GET_SUMMARY_BI_ID_ENDPOINT(id));
}