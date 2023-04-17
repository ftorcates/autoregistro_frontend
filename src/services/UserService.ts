import axios from 'axios';
import { GET_ALL_USERS_ENDPOINT, GET_USER_ENDPOINT, LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '../utils/endpoints';

export const registerUser = (username: string, name: string, email: string, password: string, role: string) => {
    return axios.post(REGISTER_ENDPOINT, {
        username, name, email, password, role
    })
}

export const loginUser = (username: string, password: string) => {
    return axios.post(LOGIN_ENDPOINT, {
        username, password
    })
}

export const getUser = (username: string) => {
    return axios.get(GET_USER_ENDPOINT(username));
}

export const getAllUsers = () => {
    return axios.get(GET_ALL_USERS_ENDPOINT);
}