import axios from "axios";
import { User } from "../types";
import jwt_decode from "jwt-decode";

const TOKEN_KEY = "token";
const defaultUser: User = {email: "", token: "", isAuthenticated: false};

const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
}

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY) || null;
}

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

//token es parametro opcional
export const authenticate = (token?: string): User => {

    //evaluamos si recibimos el token por parametro
    if (token){
        setToken(token);

    }

    //si no recibimos el token por parametro, lo intentamos obtener
    const _token = token ? token : getToken();

    //si despues de intentar obtener el token, no encontramos nada, retormanos defatulUSer
    if (!_token){
        return {...defaultUser};
    }

    //decoficamos el token
    const decoded: any = jwt_decode(_token);
    //calculamos el tiempo actual
    const currentTime = Date.now() / 1000;

    //evaluamos si el token esta vencido. Si es así retornamo defaultUSer
    if (decoded.exp < currentTime){        
        removeToken();
        return {...defaultUser};
    }

    //Si el token es válido aún, seteamos en el header Authorization el token obtenido
    axios.defaults.headers.common["Authorization"] = _token;

    //devolvemos el usuario autorizado, sobreescribiendo las propiedades sobre el default
    return {...defaultUser, email: decoded.sub, isAuthenticated: true, token: _token};
}

export const logout = (): User => {

    removeToken();
    // eliminar token de axios
    delete axios.defaults.headers.common["Authorization"];
    return {...defaultUser};
}