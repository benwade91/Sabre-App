import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { StoreProvider } from '../utils/GlobalState'
import './style.css'

import Home from '../pages/Home'
import Announcements from '../pages/Announcements'
import MessageBoard from '../pages/MessageBoard'
import MyMessages from '../pages/MyMessages'
import Settings from '../pages/Settings'
import About from '../pages/About'
import Help from '../pages/Help'
import NewPost from '../pages/NewPost'
import NoMatch from '../pages/NoMatch'
import { User } from '../pages/User'
import { Signup } from '../pages/Signup'
import GymPortal from '../pages/GymPortal'
import CheckIn from '../pages/CheckIn'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import Auth from '../utils/auth';
import TrainingLog from '../pages/TrainingLog'

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    // console.log(token)
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          {/* CHANGE LOCATION PATHNAME TO CAPTURE MORE GYMS */}
          {window.location.pathname === '/gymportal/sabre' && (
            <style>{`
            .app{
            max-width: 100vw;
            width: 100vw;
            }
            .appEnclosure {
                height: 90vh;
            }
            iframe{
              display: none;
            }

            `}</style>
          )}
          <StoreProvider>
            <Nav />
            <div className="appEnclosure">
              <Switch>
                <Route exact path="/" component={MessageBoard}></Route>
                <Route exact path="/login" component={Home}></Route>
                <Route
                  exact
                  path="/announcements"
                  component={Announcements}
                ></Route>
                <Route exact path="/my-messages" component={MyMessages}></Route>
                <Route
                  exact
                  path="/message-board"
                  component={MessageBoard}
                ></Route>
                <Route exact path="/new-post" component={NewPost}></Route>
                <Route exact path="/settings" component={Settings}></Route>
                <Route exact path="/about" component={About}></Route>
                <Route exact path="/help" component={Help}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route path="/user/:id" component={User}></Route>
                <Route path="/gymportal/:gym" component={GymPortal}></Route>
                {Auth.loggedIn() && <Route path="/checkin" component={CheckIn}></Route>}
                {Auth.loggedIn() && <Route path="/traininglog" component={TrainingLog}></Route>}
                <Route component={NoMatch} />
              </Switch>
            </div>
            <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
