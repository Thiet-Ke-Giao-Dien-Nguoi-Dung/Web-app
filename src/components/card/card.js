import React from "react";
import PropTypes from 'prop-types';
import "./style.css";

class Card extends React.Component {
    constructor(props)
    {
        super(props);
    }
    render() {
        return(
            <div className="container-card">
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
Card.protoTypes={
    numberTable : PropTypes.string,
    dateOrder: PropTypes.string,
    listCard: PropTypes.array
};
export default Card;