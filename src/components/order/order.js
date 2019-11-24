import React from 'react';
import "./style.css";
import Pending from "../pending/pending";
import Doing from "../doing/doing"
import Done from "../done/done";
class Order extends React.Component{
    render()
    {
        return(
           <div className="container-order">
               <div className="title-container">
                   Quản lý đặt món ăn
               </div>
               <div className="body-status">
                   <Pending/>
                   <Doing/>
                   <Done/>
               </div>
           </div>
        );
    }
}
export default Order;