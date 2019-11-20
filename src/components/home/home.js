import React from 'react';
import "./style.css";
import {Link, Route, Redirect, BrowserRouter, Switch} from 'react-router-dom'
import Setting from "../setting/setting";
import Dashboard from "../dashboard/dashboard";
import {getInfoRestaurant} from "../../api/restaurant-api";
import set from "./icons/icon-setting.png";
import logo from "./icons/lgweb.jpg";
import ee from "../../util/events"


class Home extends React.Component{

    constructor(props){
        super(props);
        const token = localStorage.getItem("token");
        this.handleLogout = this.handleLogout.bind(this);
        this.redirectSetting = this.redirectSetting.bind(this);
        this.pathLogin="/login";
        this.pathSetting="/settings";
        this.pathChangePassword = "/settings/changePassword";
        this.pathDashboard="/dashboard";
        this.pathDashboardMeal = "/dashboard/meal";


        let loggedIn = true;
        if(token == null)
        {
            loggedIn = false;
        }
        this.state={
            nameRestaurant:"",
            redirectSetting:false,
            loggedIn
        }

    }
    redirectSetting()
    {
        this.setState({redirectSetting:true});
    }
    handleLogout()
    {
        localStorage.removeItem("token");
        localStorage.removeItem("id_restaurant");
        this.setState({loggedIn:false});
    }
    async componentDidMount() {
        /*ePass.on("logout", (newstate) =>{
            this.setState({
                loggedIn:newstate
            })
        })*/
        ee.on("change-state",(newstate) => {
            this.setState({nameRestaurant:newstate})
        });
        const response = await getInfoRestaurant();
        if(response.success)
        {
            const data = response.data.restaurants;
            this.setState({nameRestaurant: data.name});
        }
    }


    render() {
        if(this.state.loggedIn === false)
        {
            return <Redirect to={this.pathLogin}/>
        }
        if(this.state.redirectSetting === true)
        {
            return <Redirect to={this.pathSetting}/>
        }
        return(
            <div>
                <BrowserRouter>
                <div className="header">
                    <div className="header-left">
                        <Link to={this.pathDashboardMeal}><img src={logo} alt={"logo"}/></Link>
                    </div>
                    <div className="header-right">
                        <span className="name-restaurant">{this.state.nameRestaurant}</span>
                        <Link to={this.pathChangePassword} className="icon-setting" title="setting" ><img src={set} alt="icon-setting"/></Link>
                        <button onClick={this.handleLogout} className="btn-logout">
                            <span className="icon-logout"/>
                            Đăng xuất
                        </button>
                    </div>
                </div>

                <div className="container">
                    <Switch>
                        <Route path={this.pathSetting} component={Setting}/>
                        <Route path={this.pathDashboard} component={Dashboard}/>
                    </Switch>
                </div>
                </BrowserRouter>

            </div>

        );
    }
}
export default Home;