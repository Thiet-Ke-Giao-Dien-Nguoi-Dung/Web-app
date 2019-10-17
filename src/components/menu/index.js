import React from 'react';
import MenuItem from '../menuitem';

import "./style.css";
import IconOder from './Icons/icons8-purchase-order-24.png';
import IconMeal from './Icons/icons8-meal-26.png';
import IconEmployee from './Icons/icons8-user-24.png';
import IconRevenue from './Icons/icons8-money-bag-24.png';

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [
                {
                    name_item: "Quản lý order ",
                    url_icon: IconOder,
                    url_route: "/order"
                },
                {
                    name_item: "Quản lý món ăn ",
                    url_icon: IconMeal,
                    url_route: "/meal"
                },
                {
                    name_item: "Quản lý nhân viên ",
                    url_icon: IconEmployee,
                    url_route: "/employee"
                },
                {
                    name_item: "Quản lý doanh thu ",
                    url_icon: IconRevenue,
                    url_route: "/revenue"
                }]
        }
    }

    render() {
        console.log()
        return (
            <div className="menu">
                <ul className="menu-list">
                    <MenuItem {...this.state.array[0]}/>
                    <MenuItem {...this.state.array[1]}/>
                    <MenuItem {...this.state.array[2]}/>
                    <MenuItem {...this.state.array[3]}/>
                </ul>
            </div>
        );
    }
}

export default MenuBar;