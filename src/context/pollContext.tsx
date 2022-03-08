import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from "react";
import { PollActions } from "../state/actions/pollActions";
import { pollInitialState, pollReducer } from "../state/reducers/pollReducer";
import { Poll } from "../types";

export const PollStateContext = createContext<Poll>(pollInitialState);
export const PollDispatchContext = createContext<Dispatch<PollActions>>(() => undefined);

interface PollProviderProps {
    children: ReactNode
}

export const PollProvider:FC<PollProviderProps> = ({ children }) => {
    const [poll, dispatch] = useReducer(pollReducer, pollInitialState);

    return (
        <PollStateContext.Provider value={poll}>
            <PollDispatchContext.Provider value={dispatch}>
                {children}
            </PollDispatchContext.Provider>
        </PollStateContext.Provider>
    )
}

//UX
export const usePollState = () => {
    const context = useContext(PollStateContext);

    //si el contexto es undefinede es porque está siendo usado fuera del Provider
    if (context === undefined) {
        throw new Error("usePollState must be used within an PollProvider")
    }

    return context;
}

//UX
export const usePollDispatch = () => {
    const context = useContext(PollDispatchContext);

    //si el contexto es undefinede es porque está siendo usado fuera del Provider
    if (context === undefined) {
        throw new Error("usePollDispatch must be used within an PollProvider")
    }

    return context;
}