import React from 'react';
import MenuItem from '../menuitem/menuitem';

import "./style.css";
import IconOder from './icons/icons8-bill-32.png';
import IconMeal from './icons/icons8-meal-32.png';
import IconEmployee from './icons/icons8-profile-32.png';
import IconRevenue from './icons/icons8-money-bag-32 (1).png';

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [
                {
                    title: "Quản lý đặt món  ",
                    icon: IconOder,
                    route: "/order"
                },
                {
                    title: "Quản lý món ăn ",
                    icon: IconMeal,
                    route: "/meal"
                },
                {
                    title :"Quản lý nhân viên ",
                    icon: IconEmployee,
                    route: "/employee"
                },
                {
                    title: "Quản lý doanh thu ",
                    icon: IconRevenue,
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