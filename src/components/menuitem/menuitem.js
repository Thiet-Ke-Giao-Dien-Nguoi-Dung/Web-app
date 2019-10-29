import React from 'react';
import "./style.css";
import {NavLink } from "react-router-dom";

class MenuItem extends React.Component{
    constructor(props) {
        super(props);
        var ic1 = this.props.icon;
        this.state={
            ico:ic1
        }
        this.toggleIcon=this.toggleIcon.bind(this);
    }
    toggleIcon()
    {
        var ic2 = this.props.iconAct;
        this.setState({ico:ic2})
    }

    render() {
        return (
            <li className="menu-item">
                <NavLink exact
                    activeStyle={{backgroundColor : "#fff",
                    color : "#007BFF",
                    }}
                         isActive={{src:this.props.iconAct}}
                    to={this.props.route} className="link-text">
                    <img src={this.props.icon} alt="icon-menuitem" height="24" width="24" />
                    {this.props.title}
                </NavLink>
            </li>
        );
    }
}
export default MenuItem;