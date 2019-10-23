import Content from "../content/content";
import MenuBar from "../menu";
import React from 'react';
import {BrowserRouter} from "react-router-dom";

class Dashboard extends React.Component{
    render()
    {
        return(
            <BrowserRouter>
                <MenuBar/>
                <Content/>
            </BrowserRouter>
        );
    }
}
export default Dashboard;