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
import NoMatch from "../pages/NoMatch";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

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
        <div className='appEnclosure'>
          <StoreProvider>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/announcements" component={Announcements}></Route>
              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
