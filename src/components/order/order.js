import React from 'react';
import "./style.css";
import Status from "../status/status";

class Order extends React.Component{
    render()
    {
        return(
           <div className="container-order">
               <div className="title-container">
                   Quản lý đặt món ăn
               </div>
               <div className="body-status">
                  <Status nameStatus={"pending"} titleStatus={"Đang chờ xỷ lý "} idStatus={"list-pending"}/>
                  <Status nameStatus={"doing"} titleStatus={"Đang thực hiện "} idStatus={"list-doing"}/>
                  <Status nameStatus={"done"} titleStatus={"Đã hoàn thành "} idStatus={"list-done"}/>
               </div>
           </div>
        );
    }
}
export default Order;