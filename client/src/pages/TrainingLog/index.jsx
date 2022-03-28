import React from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_CHECKINS } from '../../utils/queries'

const TrainingLog = () => {
    const { data, } = useQuery(QUERY_ALL_CHECKINS);
    console.log(data);
  return (
    <>
        {data && data.getCheckIn.map((e)=> e.user && console.log(e.user.username))}
    </>
  )
}

export default TrainingLog