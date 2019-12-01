import React from "react";
import PropTypes from 'prop-types';
import "./style.css";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.dragStart = this.dragStart.bind(this);

    }

    dragStart(event) {
        let data = {
            id: event.target.id,
            status: this.props.statusOrder
        };
        let j = JSON.stringify(data);
        event.dataTransfer.setData("text", j);
        //event.dataTransfer.setData("text", event.target.id);
    }

    render() {
        return (
            <div className="container-card" id={this.props.idCard} draggable={true} onDragStart={this.dragStart} onClick={() => this.props.onShowCard(this.props.idCard)}>
                <div className="header-card">
                    <label className="number-table">{this.props.numberTable}</label>
                    {/*<label className="date-order">Ngày: {this.props.dateOrder}</label>*/}
                </div>
                <div className="content-card">
                    <ol>
                        {
                            (this.props.listCard || []).map((e, index) => {
                                return <li key={e.OrderItem.id_item}>{e.name}</li>
                            })
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

Card.protoTypes = {
    idCard: PropTypes.string,
    statusOrder:PropTypes.string,
    numberTable: PropTypes.string,
    dateOrder: PropTypes.string,
    listCard: PropTypes.array,
    onShowCard: PropTypes.func.isRequired
};
export default Card;