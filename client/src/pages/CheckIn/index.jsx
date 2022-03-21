import React from 'react';
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from "@apollo/client";
import './style.css';

const CheckIn = () => {
    const { data, } = useQuery(QUERY_USER);
    data?.user?._id && console.log(data.user._id);
  return (
    <div className='checkInPage'>
        {data?.user?._id && <img alt='QR Code' src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data.user._id}`} ></img>}
    </div>
  )
}

export default CheckIn