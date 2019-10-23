import React from 'react';
import {Link, Redirect} from "react-router-dom";
import "./style.css";
import noti from "./icons/icons8-notification-24.png";
import setting from "./icons/icons8-settings-24.png";

class Header extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            logOut:false
        }

    }
    clickLogout = () =>
    {
        localStorage.removeItem("token");
        this.setState({logOut:true})
    }
    render() {
        if(this.state.logOut === true)
        {
            return <Redirect to='/login'/>
        }
        return(
            <div id="header">
                <div className="logo">
                    <Link to="/dashboard">ETO</Link>
                </div>
                <div className="header-bar">
                    <ul className="header-item">
                        <li>Cua hang</li>
                        <li>
                            <img src={noti} alt="noti"/>
                        </li>
                        <li>
                            <Link to="/setting"><img src={setting} alt="setting"/></Link>
                        </li>
                        <li>
                            <button onClick={this.clickLogout}>
                                Log out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Header;