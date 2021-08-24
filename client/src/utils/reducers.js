import { useReducer } from "react";
import {
    SET_CURRENT_USER,
    REDIRECT_ON_LOGIN,
    SET_LOADING
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loadingGif: !state.loadingGif
            }
        case REDIRECT_ON_LOGIN:
            return {
                ...state,
                initialRedirect: !state.initialRedirect
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
            }
        default:
            return state;
    }
};

export function useModalReducer(initialState) {
    return useReducer(reducer, initialState);
};
