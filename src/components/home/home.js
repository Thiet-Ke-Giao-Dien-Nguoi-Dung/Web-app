import Content from "../content/content";
import MenuBar from "../menu";
import React from 'react';
import { BrowserRouter, Redirect} from "react-router-dom";
import "./style.css"
import Header from "../header/header";

class Home extends React.Component{
    constructor(props){
        super(props);
        const token = localStorage.getItem("token");

        let loggedIn = true;
        if(token == null)
        {
            loggedIn = false
        }
        this.state={
            loggedIn
        }

    }

    render() {
        if(this.state.loggedIn === false)
        {
            return <Redirect to={"/login"}/>
        }
        return(
            <div>
                <Header/>
                <div id="container">
                    <BrowserRouter>
                        <MenuBar/>
                        <Content/>
                    </BrowserRouter>
                </div>
            </div>

        );
    }
}
export default Home;
