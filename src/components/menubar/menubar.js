import React from 'react';
import MenuItem from '../menuitem/menuitem';

import "./style.css";
import IconOder from './icons/icons8-purchase-order-24.png';
import IconMeal from './icons/icons8-meal-26.png';
import IconEmployee from './icons/icons8-user-24.png';
import IconRevenue from './icons/icons8-money-bag-24.png';

import iconOrderAct from "./icons/icons8-purchase-order-24 (1).png"
import iconMealAct from "./icons/icons8-meal-26 (1).png"
import iconEmployeeAct from "./icons/icons8-user-24 (1).png"
import iconRevenueAct from "./icons/icons8-money-bag-24 (1).png"

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [
                {
                    title: "Quản lý đặt món  ",
                    icon: IconOder,
                    iconAct:iconOrderAct,
                    route: "/order"
                },
                {
                    title: "Quản lý món ăn ",
                    icon: IconMeal,
                    iconAct:iconMealAct,
                    route: "/meal"
                },
                {
                    title :"Quản lý nhân viên ",
                    icon: IconEmployee,
                    iconAct:iconEmployeeAct,
                    route: "/employee"
                },
                {
                    title: "Quản lý doanh thu ",
                    icon: IconRevenue,
                    iconAct:iconRevenueAct,
                    route: "/revenue"
                }]
        }
    }

    render() {
        console.log()
        return (
            <ul className="menu-list">
                <MenuItem {...this.state.menuItems[0]}/>
                <MenuItem {...this.state.menuItems[1]}/>
                <MenuItem {...this.state.menuItems[2]}/>
                <MenuItem {...this.state.menuItems[3]}/>
            </ul>
        );
    }
}

export default MenuBar;