import React, {useEffect} from 'react';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER_BY_ID } from '../../utils/queries';

export const User = (props) => {
    const userId = props.match.params.id;
    const { loading, data } = useQuery(QUERY_USER_BY_ID, {
        variables: {_id: userId}
    });

    console.log(data.getUserById.username);
    return (
        <div>
            <h1>{data.getUserById.username}</h1>
        </div>
    )
}
