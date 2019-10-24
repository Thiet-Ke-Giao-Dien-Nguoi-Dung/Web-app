import React from 'react';
import './App.css';

import Home from "./components/home/home"


import {Route,Switch} from "react-router-dom";

class App extends React.Component{
  render() {
      return (
          <Switch>
              <Route path ="/" component={Home}/>
          </Switch>

    )
  }
}

export default App;