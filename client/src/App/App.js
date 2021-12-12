import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { StoreProvider } from "../utils/GlobalState";
import './style.css'

import Home from "../pages/Home";
import Announcements from '../pages/Announcements';
import MessageBoard from '../pages/MessageBoard'
import MyMessages from '../pages/MyMessages';
import Settings from '../pages/Settings';
import About from '../pages/About';
import Help from '../pages/Help';
import NewPost from '../pages/NewPost';
import NoMatch from "../pages/NoMatch";
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Signup } from "../pages/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from '../utils/auth';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    // console.log(token)
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});



function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
      <div className='app'>
        <StoreProvider>
            <Nav />
          <div className='appEnclosure'>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/announcements" component={Announcements}></Route>
              <Route exact path="/my-messages" component={MyMessages}></Route>
              <Route exact path="/message-board" component={MessageBoard}></Route>
              <Route exact path="/new-post" component={NewPost}></Route>
              <Route exact path="/settings" component={Settings}></Route>
              <Route exact path="/about" component={About}></Route>
              <Route exact path="/help" component={Help}></Route>
              <Route exact path="/signup" component={Signup}></Route>
              <Route component={NoMatch} />
            </Switch>
          </div>
          {Auth.loggedIn() && <Footer />}
        </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
