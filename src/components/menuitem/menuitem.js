import React from 'react';
import "./style.css";
import { Link } from "react-router-dom";

class MenuItem extends React.Component{
    render() {
        console.log(this.props);
        return (
            <li className="menu-item">
                <Link to={this.props.route} className="link-text">
                    <img src={this.props.icon} alt="icon-menuitem" height="32" width="32"/>
                    {this.props.title}
                </Link>
            </li>
        );
    }
}
export default MenuItem;