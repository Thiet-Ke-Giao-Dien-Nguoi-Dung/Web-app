import React from 'react';
import "./style.css";
import { Link } from "react-router-dom";

class MenuItem extends React.Component{
    render() {
        console.log(this.props);
        return (
            <li className="menu-item">
                <Link to={this.props.url_route} className="link-text">
                    <img src={this.props.url_icon} alt="icon menu item" height="24" width="24"/>
                    {this.props.name_item}
                </Link>
            </li>
        );
    }
}
export default MenuItem;