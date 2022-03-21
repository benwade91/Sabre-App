import React, { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { SET_PORTAL } from '../../utils/actions'
import { QUERY_USER_BY_ID } from '../../utils/queries'
import { useQuery } from '@apollo/react-hooks'
import { useStoreContext } from '../../utils/GlobalState'
import './style.css'

const GymPortal = () => {
  const [data, setData] = useState('No result')
  const [, dispatch] = useStoreContext()
  const { loading, error, data: userData, refetch } = useQuery(
    QUERY_USER_BY_ID,
    {
      variables: { _id: data },
    },
  )

  error && console.log('error')

  useEffect(() => {
    dispatch({
      type: SET_PORTAL,
    })
  }, [dispatch])

  useEffect(() => {
    refetch()
  }, [data])

  console.log(userData)

  return (
    <div className="qrPage">
      <QrReader
        className="qrWindow"
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text)
          }

          if (!!error) {
            //   console.info(error);
          }
        }}
      />
      <p>{userData ? userData.getUserById.username : data}</p>
    </div>
  )
}

export default GymPortal
