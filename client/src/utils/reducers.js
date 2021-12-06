import { useReducer } from "react";
import {
    SET_CURRENT_USER,
    REDIRECT_ON_LOGIN,
    SET_LOADING,
    NEW_ANNOUNCEMENT,
    LOGIN_STATUS
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
        case NEW_ANNOUNCEMENT:
                return {
                    ...state,
                    newAnnouncement: action.newAnnouncement
                }
        case LOGIN_STATUS:
                return {
                    ...state,
                    loggedIn: action.loggedIn
                }
        default:
            return state;
    }
};

export function useModalReducer(initialState) {
    return useReducer(reducer, initialState);
};
