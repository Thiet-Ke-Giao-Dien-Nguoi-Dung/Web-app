import React from 'react';
import "./style.css";
import Status from "../status/status";
import {getOderById} from "../../api/order-api";
import {notification} from "../../util/noti";

class Order extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            showDetail: false,

            numberTable:"",
            statusOrder:"",
            dateOrder:"",
            service:"",
            items:"",
            sumOrder:""

        }
    }
    showDetailCard = async (id_order) =>
    {
        this.setState({
            showDetail:true
        })
        let res = await getOderById(id_order);
        if(res.success)
        {
            let result = res.data.order;
            let status;
            if(result.status === "pending")
            {
                status = "Đang chờ xỷ lý";
            }
            else if(result.status === "doing")
            {
                status= "Đang thực hiện";
            }
            else {
                status="Đã hoàn thành";
            }
            this.setState({
                numberTable:result.Table.location,
                statusOrder:status,
                dateOrder:result.create_time,
                service:"",
                items:result.items,
                sumOrder:result.revenue
            })
        }
        else {
            notification("error", res.message);
        }
    };
    render()
    {
        return(
           <div className="container-order">
               <div className="title-container">
                   Quản lý đặt món ăn
               </div>
               <div className="body-status">
                   <div className="container-status">
                      <Status nameStatus={"pending"} titleStatus={"Đang chờ xỷ lý "} idStatus={"list-pending"} onShow={this.showDetailCard}/>
                      <Status nameStatus={"doing"} titleStatus={"Đang thực hiện "} idStatus={"list-doing"} onShow={this.showDetailCard}/>
                      <Status nameStatus={"done"} titleStatus={"Đã hoàn thành "} idStatus={"list-done"} onShow={this.showDetailCard}/>
                   </div>
                   <div className="detail-card" style={{display:this.state.showDetail ? "inherit" : "none"}}>
                        <div className="detail-title">
                            <div className="brand">Chi tiết hóa đơn </div>
                            <button  className="detail-btn-close" onClick={() => this.setState({showDetail:false})}>X</button>
                        </div>
                        <div className="body-detail">
                            <div className="group-detail">
                                <label>Bàn: </label>
                                <div>{this.state.numberTable}</div>
                            </div>
                            <div className="group-detail">
                                <label>Trạng thái: </label>
                                <div>{this.state.statusOrder}</div>
                            </div>
                            <div className="group-detail">
                                <label>Ngày tạo: </label>
                                <div>{this.state.dateOrder}</div>
                            </div>
                            <div className="group-detail">
                                <label>Danh sách món ăn: </label>
                                <table className="tbl-detail">
                                    <thead>
                                        <tr>
                                            <th>Tên món </th>
                                            <th>SL </th>
                                            <th>Giá</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        (this.state.items || []).map((e, index) =>{
                                            return(

                                                <tr key={e.OrderItem.id_item}>
                                                    <td>{e.name}</td>
                                                    <td>{e.OrderItem.quantity}</td>
                                                    <td>{e.price}</td>
                                                    <td>{e.price * e.OrderItem.quantity}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                        <tr className="tong">
                                            <td colSpan={3}>Tổng </td>
                                            <td>{this.state.sumOrder}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                   </div>
               </div>
           </div>
        );
    }
}
export default Order;