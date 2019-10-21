import React from 'react';
import {Link} from "react-router-dom";
import "./style.css";
import noti from "./icons/icons8-notification-24.png";
import setting from "./icons/icons8-settings-24.png";

class Header extends React.Component{
    render() {
        return(
            <div id="header">
                <div className="logo">
                    ETO
                </div>
                <div className="header-bar">
                    <ul className="header-item">
                        <li>Cua hang</li>
                        <li>
                            <img src={noti} alt="noti"/>
                        </li>
                        <li>
                            <img src={setting} alt="setting"/>
                        </li>
                        <li>
                            <button>
                                <Link to={'/login'}>Logout</Link>
                            </button>
                        </li>
                    </ul>
                </div>


            </div>
        );
    }
}
export default Header;