import React from 'react';
import "./style.css";
import MenuBar from "../menubar/menubar";
import {BrowserRouter, Route} from 'react-router-dom'
import Order from "../order/order";
import Meal from "../meal";
import Employee from "../employee/employee";
import Revenue from "../revenue/revenue";


class Dashboard extends React.Component{
    render() {
        return(
            <div>
                <BrowserRouter>
                    <div className="menubar">
                        <MenuBar/>
                    </div>

                    <div className="content">

                        <Route path="/dashboard/order" component={Order}/>
                        <Route path="/dashboard/meal" component={Meal}/>
                        <Route path="/dashboard/employee" component={Employee}/>
                        <Route path="/dashboard/revenue" component={Revenue}/>

                    </div>

                </BrowserRouter>
            </div>



        );
    }
}
export default Dashboard;