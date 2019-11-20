import React from "react";
import "./style.css";
import MenuItem from "../menuitem/menuitem";
import {Route, BrowserRouter} from "react-router-dom";
import Password from "../password/password";
import Restaurant from "../restaurant/restaurant";

class Setting extends React.Component {
    constructor(props)
    {
        super(props);
        this.pathChangePassword = "/settings/changePassword";
        this.pathEditProfile = "/settings/editProfile";
        this.state={
            menuItems: [
                {
                    title: "Thay đổi mật khẩu",
                    name:"re-password",
                    route: this.pathChangePassword
                },
                {
                    title: "Chỉnh sửa thông tin cửa hàng",
                    name:"edit-info",
                    route: this.pathEditProfile
                }]
        }
    }
    render() {
        return(
            <BrowserRouter>
                <div className="menubar">
                    <ul className="menu-list">
                        <li className="title">Settings</li>
                        <MenuItem {...this.state.menuItems[0]}/>
                        <MenuItem {...this.state.menuItems[1]}/>
                    </ul>
                </div>
                <div className="content">
                    <Route path={this.pathChangePassword} component={Password}/>
                    <Route path={this.pathEditProfile} component={Restaurant}/>
                </div>

            </BrowserRouter>
        );
    }
}
export default Setting;