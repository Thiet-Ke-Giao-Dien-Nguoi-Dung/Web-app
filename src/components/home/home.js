import React from 'react';
import "./style.css";
import MenuBar from "../menubar/menubar";
import {Route} from 'react-router-dom'
import Order from "../order/order";
import Meal from "../meal";
import Employee from "../employee/employee";
import Revenue from "../revenue/revenue";
class Home extends React.Component{
    render() {
        return(<div>
            <div className="header">
                <div className="header-left">
                    <div>Logo</div>
                    <button className="btn-dashboard">Trang chủ</button>
                    <div>Ten cua hang</div>
                </div>
                <div className="header-right">
                </div>
            </div>
            <div className="container">

            </div>
            <div className="menubar">
                <MenuBar/>
            </div>
            <div className="content">
                <Route path="/order" component={Order}/>
                <Route path="/meal" component={Meal}/>
                <Route path="/employee" component={Employee}/>
                <Route path="/revenue" component={Revenue}/>
            </div>
        </div>);
    }
}
export default Home;