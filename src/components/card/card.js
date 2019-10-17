import React from 'react';
import "./style.css";

class Card extends React.Component{
    dragStart = (event) =>{
        event.dataTransfer.setData("Text", event.target.id);
    }
    render() {

        return(
            <div onDragStart={this.dragStart} draggable="true" className="card-item" id={this.props.tableNumber}>
                <div className="title-card">
                    <h3 className="table-number">Bàn 1</h3>
                    <p className="date-order">Today 9am</p>
                </div>
                <div className="list-meal">
                    <ol>
                        <li>Trà sữa chân trâu đường đen</li>
                        <li>Trà sữa chân trâu đường đen</li>

                    </ol>

                </div>

            </div>
        );
    }
}
export default Card;