import React from 'react';
import "./style.css";
import Pending from "../pending/pending";
import Doing from "../doing/doing";
import Done from "../done/done";

class Order extends React.Component{
    render() {
        return (
            <div className="order">
               <Pending/>
               <Doing/>
               <Done/>
            </div>
        );
    }
}
export default Order;