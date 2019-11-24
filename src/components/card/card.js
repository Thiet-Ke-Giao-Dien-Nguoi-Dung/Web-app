import React from "react";
import PropTypes from 'prop-types';
import "./style.css";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.dragStart = this.dragStart.bind(this);

    }

    dragStart(event) {
        event.dataTransfer.setData("text", event.target.id);
    }

    render() {
        return (
            <div className="container-card" id={this.props.idCard} draggable={true} onDragStart={this.dragStart}>
                <div className="header-card">
                    <label className="number-table">{this.props.numberTable}</label>
                    <label className="date-order">Ngày: {this.props.dateOrder}</label>
                </div>
                <div className="content-card">
                    <ul>
                        {
                            (this.props.listCard || []).map((e, index) => {
                                return <li key={e.OrderItem.id_item}>{e.name}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

Card.protoTypes = {
    idCard: PropTypes.string,
    numberTable: PropTypes.string,
    dateOrder: PropTypes.string,
    listCard: PropTypes.array
};
export default Card;