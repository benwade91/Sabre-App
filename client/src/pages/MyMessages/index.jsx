import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";

const MessageBoard = () => {
    const [state, dispatch] = useStoreContext();

    console.log(state);
    
    return <div>
My Messages
    </div>
}

export default MessageBoard