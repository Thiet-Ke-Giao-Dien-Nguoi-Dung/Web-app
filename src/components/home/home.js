import React from 'react';
import "./style.css";
import MenuBar from "../menubar/menubar";
import {Link, Route, Redirect, BrowserRouter} from 'react-router-dom'
import Order from "../order/order";
import Meal from "../meal";
import Employee from "../employee/employee";
import Revenue from "../revenue/revenue";
import logo from "./icons/logo-ETO.jpg";

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
        /*if(this.state.loggedIn === false)
        {
            return <Redirect to={"/login"}/>
        }*/
        return(
            <BrowserRouter>
                <div className="header">
                    <div className="header-left">
                        <Link to="/home"><img src={logo} alt="logo" width="50px" height="50px"/></Link>
                    </div>
                    <div className="header-right">
                    </div>
                </div>
                <div className="container">
                    <div className="menubar">
                        <MenuBar/>
                    </div>
                    <div className="content">
                        <Route path="/order" component={Order}/>
                        <Route path="/meal" component={Meal}/>
                        <Route path="/employee" component={Employee}/>
                        <Route path="/revenue" component={Revenue}/>
                    </div>
                </div>
            </BrowserRouter>

        );
    }
}
export default Home;