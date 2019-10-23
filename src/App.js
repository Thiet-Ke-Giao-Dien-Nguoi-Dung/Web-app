import React from 'react';
import './App.css';

import Home from "./components/home/home"
import Login from "./components/login/login";
import Register from "./components/register/register";


import {Route,Switch} from "react-router-dom";

class App extends React.Component{
  render() {
      return (
          <Switch>
              <Route path ="/home" component={Home}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/register" component={Register}/>
          </Switch>

    )
  }
}

export default App;