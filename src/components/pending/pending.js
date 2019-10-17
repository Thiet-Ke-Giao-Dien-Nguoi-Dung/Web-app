import React from 'react';
import "./style.css";
import Card from "../card/card.js"

class Pending extends React.Component{
    allowDrop = (event)=> {
        event.preventDefault();
    }

    drop = (event) => {
        event.preventDefault();
        var data = event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data));
    }
    render() {

        return(
            <div className="waiting">
                <div className="title">
                    Pending
                </div>
                <div className="list-card" onDrop={this.drop} onDragOver={this.allowDrop}>
                    <Card tableNumber="1" />
                    <Card tableNumber="2" />
                    <Card tableNumber="3" />
                </div>
            </div>
        );
    }
}
export default Pending;