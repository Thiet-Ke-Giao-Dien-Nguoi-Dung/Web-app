import Content from "../content/content";
import MenuBar from "../menu";
import React from 'react';
import { BrowserRouter} from "react-router-dom";

class Home extends React.Component{

    render() {
        return(
            <div>
                <div id="header"></div>
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
