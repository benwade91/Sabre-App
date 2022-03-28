import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER_BY_ID } from '../../utils/queries';
import { formatDate } from '../../utils/helpers';
import ReactHtmlParser from 'react-html-parser';
import whiteBelt from './images/whiteBelt.png';
import blueBelt from './images/blueBelt.png';
import purpleBelt from './images/purpleBelt.png';
import brownBelt from './images/brownBelt.png';
import blackBelt from './images/blackBelt.png';
import './style.css';

export const User = (props) => {
  const userId = props.match.params.id
  const { data } = useQuery(QUERY_USER_BY_ID, {
    variables: { _id: userId },
  })
  const beltHelper = (belt) => {
    const belts = {
      White: whiteBelt,
      Blue: blueBelt,
      Purple: purpleBelt,
      Brown: brownBelt,
      Black: blackBelt,
    }
    return belts[belt]
  }
  
  return (
    <div>
      {data ? (
        <div className='userPage'>
          <div className="userHeader">
            <div className="userInfo">
              <h1>{data.getUserById.username}</h1>
              <h2>{data.getUserById.whatGym}</h2>
            </div>
            <img
              className="beltImg"
              src={beltHelper(data.getUserById.beltColor)}
              alt="jiujitsu belt"
            />
          </div>
          <div className="userBody">
            {data.getUserById.posts.map((post, index) => (
              <div key={index} className="userPost">
                <p>
                  <span className="text-muted"> - {formatDate(post.date)}</span>
                  {ReactHtmlParser(post.content)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  )
}
