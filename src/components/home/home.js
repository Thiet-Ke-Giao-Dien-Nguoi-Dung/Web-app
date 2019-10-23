
import React from 'react';
import { Route, Redirect, BrowserRouter} from "react-router-dom";
import "./style.css"
import Header from "../header/header";
import Setting from "../setting/setting";
import Dashboard from "../dashboard/dashboard";

class Home extends React.Component{
    constructor(props){
        super(props);
        const token = localStorage.getItem("token");

        let loggedIn = true;
        if(token == null)
        {
            loggedIn = false
        }
        this.state={
            loggedIn
        }

    }

    render() {
        if(this.state.loggedIn === false)
        {
            return <Redirect to={"/login"}/>
        }
        return(
            <div>
                <BrowserRouter>
                    <Header/>
                    <div id="container">
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/setting" component={Setting}/>
                    </div>
                </BrowserRouter>
            </div>

        );
    }
}
export default Home;
