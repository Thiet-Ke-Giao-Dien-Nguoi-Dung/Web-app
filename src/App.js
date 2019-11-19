import React from 'react';
import './App.css';

import Home from "./components/home/home"
import Login from "./components/login/login"
import Register from "./components/register/register"


import {Route,Switch} from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";


class App extends React.Component{
  render() {
      return (
          <div>
              <Switch>
                  <Route exact path="/" render={() => (
                      localStorage.getItem("token")
                      ? (
                          <Redirect to="/dashboard/order"/>
                      ) : (
                          <Redirect to="/login"/>
                      )
                  )}/>
                  <Route path ="/dashboard" component={Home}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register}/>
              </Switch>
          </div>


    )
  }
}

export default App;