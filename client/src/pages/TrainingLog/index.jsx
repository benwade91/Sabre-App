import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_CHECKINS } from '../../utils/queries'
import { useStoreContext } from '../../utils/GlobalState'
import { Table, Form } from 'react-bootstrap'

const TrainingLog = () => {
  const [state] = useStoreContext()
  const [memberTable, setMemberTable] = useState(null)
  const { data } = useQuery(QUERY_ALL_CHECKINS)

  useEffect(() => {
    data && setMemberTable(data.getCheckIn)
  }, [data])

  const gymFilter = (event) => {
    const { value } = event.target
    if (value === 'default') {
      setMemberTable(data.getCheckIn)
    } else {
      setMemberTable(data.getCheckIn.filter((user) => user.gym === value))
    }
  }
  return (
    <>
      {state.currentUser && state.currentUser.administrator && (
        <Form.Select onChange={gymFilter} name="whatGym">
          <option value="default">Filter Gym</option>
          <option value="sabre">Sabre</option>
          <option value="T4L">T4L</option>
          <option value="eastbayacademy">East Bay Academy</option>
          <option value="dumlaos">Dumlao's</option>
          <option value="bigbreak">Big Break</option>
          <option value="rooted">Rooted</option>
        </Form.Select>
      )}
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Gym</th>
          </tr>
        </thead>
        <tbody>
          {memberTable &&
            memberTable.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.user.username}</td>
                  <td>{user.date}</td>
                  <td>{user.gym}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </>
  )
}

export default TrainingLog
