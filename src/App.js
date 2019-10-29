import React from 'react';
import './App.css';

import Home from "./components/home/home"
import Login from "./components/login/login"
import Register from "./components/register/register"

import {Route,Switch} from "react-router-dom";

class App extends React.Component{
  render() {
      return (
          <div>
              <Switch>
                  <Route path ="/home" exact component={Home}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register}/>
              </Switch>
          </div>


    )
  }
}

export default App;