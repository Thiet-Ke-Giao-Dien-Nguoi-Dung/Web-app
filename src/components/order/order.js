import React from 'react';
import "./style.css";

class Order extends React.Component{
    render() {
        return(
        <div className="container-order">
            <div className="todo">
                To do
            </div>
            <div className="todo">Doing</div>
            <div className="todo">Done</div>
        </div>);
    }
}
export default Order;