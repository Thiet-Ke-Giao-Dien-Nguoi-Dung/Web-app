import React from 'react';
import MenuItem from '../menuitem/menuitem';

import "./style.css";

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.pathDashboardOrder = "/dashboard/order";
        this.pathDashboardMeal = "/dashboard/meal";
        this.pathDashboardEmployee = "/dashboard/employee";
        this.pathDashboardRevenue = "/dashboard/revenue";

        this.state = {
            menuItems: [
                {
                    title: "Quản lý đặt món  ",
                    name:"order",
                    route: this.pathDashboardOrder
                },
                {
                    title: "Quản lý món ăn ",
                    name:"meal",
                    route: this.pathDashboardMeal
                },
                {
                    title :"Quản lý nhân viên ",
                    name:"employee",
                    route: this.pathDashboardEmployee
                },
                {
                    title: "Quản lý doanh thu ",
                    name:"revenue",
                    route: this.pathDashboardRevenue
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