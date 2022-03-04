import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from "react";
import { AuthActions } from "../state/actions/authActions";
import { authInitialState, authReducer } from "../state/reducers/authReducer";
import { User } from "../types";

export const AuthStateContext = createContext<User>(authInitialState);
export const AuthDispatchContext = createContext<Dispatch<AuthActions>>(() => undefined);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider:FC<AuthProviderProps> = ({ children }) => {
    const [user, dispatch] = useReducer(authReducer, authInitialState);

    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

//UX
export const useAuthState = () => {
    const context = useContext(AuthStateContext);

    //si el contexto es undefinede es porque está siendo usado fuera del Provider
    if (context === undefined) {
        throw new Error("useAuthState must be used within an AuthProvider")
    }

    return context;
}

//UX
export const useAuthDispatch = () => {
    const context = useContext(AuthDispatchContext);

    //si el contexto es undefinede es porque está siendo usado fuera del Provider
    if (context === undefined) {
        throw new Error("useAuthDispatch must be used within an AuthProvider")
    }

    return context;
}