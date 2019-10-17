import React from 'react';
import "./style.css";

class Doing extends React.Component{
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
            <div className="doing">
                <div className="title">Doing</div>
                <div className="list-card" onDrop={this.drop} onDragOver={this.allowDrop}>

                </div>
            </div>
        );
    }
}
export default Doing;