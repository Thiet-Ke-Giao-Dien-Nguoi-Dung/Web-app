import React from 'react';
import "./style.css";
import {NavLink } from "react-router-dom";

class MenuItem extends React.Component{

    render() {
        return (
            <li className="menu-item">
                <NavLink exact
                    activeStyle={{backgroundColor : "#fff",

                    }}
                    activeClassName={"checked"}
                    to={this.props.route} className="link-text">

                    <span className={this.props.name}></span>
                    {this.props.title}

                </NavLink>
            </li>
        );
    }
}
export default MenuItem;