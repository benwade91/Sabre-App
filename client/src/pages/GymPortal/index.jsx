import React, { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { SET_PORTAL } from '../../utils/actions'
import { QUERY_USER_BY_ID } from '../../utils/queries'
import { useQuery } from '@apollo/react-hooks'
import { useStoreContext } from '../../utils/GlobalState'
import { Button } from 'react-bootstrap'
import './style.css'

const GymPortal = () => {
  const [data, setData] = useState('No result')
  const [showQr, setShowQr] = useState(false)
  const [, dispatch] = useStoreContext()
  const { error: qrError, data: userData, refetch } = useQuery(
    QUERY_USER_BY_ID,
    {
      variables: { _id: data },
    },
  )

  if (qrError) console.log(qrError.message);

  useEffect(() => {
    dispatch({
      type: SET_PORTAL,
    })
  }, [dispatch])

  useEffect(() => {
    refetch()
  }, [data, refetch])

  useEffect(() => {
    if (showQr) {
        setTimeout(()=> {
            setShowQr(false)
            setData("Please scan QR code")
        }, 20000);
    }
  }, [showQr])

  console.log(userData)

  return (
    <div className="qrPage">
{showQr ? <QrReader
        className="qrWindow"
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text)
            // setShowQr(false)
          }

          if (!!error) {
            //   console.info(error);
          }
        }}
      /> :
      <Button
            variant="success"
            className="logOutBtn"
            onClick={()=>setShowQr(true)}
          >Check-in</Button>}
      {showQr && <p>{userData ? userData.getUserById.username : data}</p>}
    </div>
  )
}

export default GymPortal
