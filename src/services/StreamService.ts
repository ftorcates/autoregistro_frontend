import axios from "axios"
import { GET_STREAMS_ENDPOINT, GET_STREAM_BY_ID_ENDPOINT } from "../utils/endpoints";

export const getStreams = () => {
    return axios.get(GET_STREAMS_ENDPOINT);
}

export const getStreamById = (id: string) => {
    return axios.get(GET_STREAM_BY_ID_ENDPOINT(id));
}