import axios from "axios"
import { CREATE_ERROR_ENDPOINT, GET_ERROR_BY_ID_ENDPOINT, GET_ERROR_BY_STREAM_ID_ENDPOINT } from "../utils/endpoints"

export const registrarError = (data: any) =>  {
    return axios.post(CREATE_ERROR_ENDPOINT, data);
}

export const getErrorsByStreamId = (id: string) => {
    return axios.get(GET_ERROR_BY_STREAM_ID_ENDPOINT(id));
}

export const getErrorById = (id: string) => {
    return axios.get(GET_ERROR_BY_ID_ENDPOINT(id));
}