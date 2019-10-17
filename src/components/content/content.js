import React from 'react';
import Meal from '../meal/meal';
import Order from '../order/order';
import Employee from '../employee/employee'
import Revenue from '../revenue/revenue';
import "./style.css";
import {Route } from "react-router-dom";
class Content extends React.Component{
    render() {
        return(
            <div className="content">
                <Route path="/order" component={Order} />
                <Route path="/meal" component={Meal} />
                <Route path="/employee" component={Employee} />
                <Route path="/revenue" component={Revenue} />
            </div>
       );
    }
}
export default Content;
