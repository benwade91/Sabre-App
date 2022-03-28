import React, { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { SET_PORTAL } from '../../utils/actions'
import { QUERY_USER_BY_ID } from '../../utils/queries'
import { useLazyQuery } from '@apollo/client'
import { useStoreContext } from '../../utils/GlobalState'
import { Button } from 'react-bootstrap'
import './style.css'

const GymPortal = (props) => {
  const location = props.match.params.gym
  const [data, setData] = useState('No result')
  const [showQr, setShowQr] = useState(false)
  const [, dispatch] = useStoreContext()
  // const { error: qrError, data: userData, refetch } = useQuery(
  //   QUERY_USER_BY_ID,
  //   {
  //     variables: { _id: data },
  //   },
  // )
  const [getUser, { loading, error: qrError, data: userData }] = useLazyQuery(
    QUERY_USER_BY_ID,
  )

  if (qrError) console.log(qrError.message)

  useEffect(() => {
    dispatch({
      type: SET_PORTAL,
    })
  }, [dispatch])

  // useEffect(() => {
  //   refetch()
  // }, [data, refetch])

  // useEffect(() => {
  //   getUser({
  //     variables: { _id: data },
  //   })
  // }, [data, getUser])

  const updateCheckIn = () =>{
    getUser({
      variables: { _id: data },
    })
  }

  useEffect(() => {
    if (showQr) {
      setTimeout(() => {
        setShowQr(false)
        setData('Please scan QR code')
      }, 20000)
    }
  }, [showQr])

  console.log(userData)

  return (
    <div className="qrPage">
      {showQr ? (
        <QrReader
          className="qrWindow"
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text)
              updateCheckIn()
              // setShowQr(false)
            }

            if (!!error) {
              //   console.info(error);
            }
          }}
        />
      ) : (
        <>
        <h1>Welcome to {location.charAt(0).toUpperCase()+ location.slice(1).toLowerCase()}</h1>
        <Button
          variant="success"
          className="logOutBtn"
          onClick={() => setShowQr(true)}
        >
          Check-in
        </Button>
        </>
      )}
      {showQr && <p>{userData ? userData.getUserById.username : data}</p>}
    </div>
  )
}

export default GymPortal
