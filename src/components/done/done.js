import React from 'react';
import "./style.css";

class Done extends React.Component{
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
            <div className="done">
                <div className="title">Done</div>
                <div className="list-card" onDrop={this.drop} onDragOver={this.allowDrop}>
                </div>
            </div>
        );
    }
}
export default Done;