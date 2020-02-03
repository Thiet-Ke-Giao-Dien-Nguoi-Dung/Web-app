import React from 'react';
import './App.css';

import Home from "./components/home/home"
import Login from "./components/login/login"
import Register from "./components/register/register"
import { ToastContainer } from 'react-toastify';


import {Route,Switch, Redirect} from "react-router-dom";
import Setting from "./components/setting/setting";



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
                  <Route path="/setting" component={Setting}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register}/>
              </Switch>
              <ToastContainer/>
          </div>

    )
  }
}

export default App;