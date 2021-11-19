import React, { createContext, useContext } from "react";
import { useModalReducer } from "./reducers";
// import { todaysDate } from './helpers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useModalReducer({
        menu: false,
        currentUser: undefined,
        loggedIn: false
    });
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
