import React from 'react';
import "./style.css";
import Status from "../status/status";
import {getOderById, getPrintBill} from "../../api/order-api";
import ee from "../../util/events"
import {notification} from "../../util/noti";
import Confirm from "../confirm-alert/confirm";
const URL_BASE = process.env.REACT_APP_API_URL;


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
            sumOrder:"",

            changeStatus:false,
            idOrder:"",

            openBill:false

        };
        this.reloadWhenStatusOrderChange = this.reloadWhenStatusOrderChange.bind(this);
        this.printBill = this.printBill.bind(this);

    }
    toggleOpenBill = () =>{

        if(this.state.statusOrder === "Đã hoàn thành")
        {
            this.setState({
                openBill: !this.state.openBill
            })
        }
        else
            notification("warning", "Đơn hàng này chưa xong nên không thể xuất hóa đơn ")

    };

    async printBill()
    {
        let id_order = this.state.idOrder;
        let res = await getPrintBill(id_order);
        if(res.success)
        {
            this.setState({
                openBill: !this.state.openBill
            });
            let a_tag = document.createElement('a');
            let href = URL_BASE + "/static/" + res.data.file_name;
            a_tag.setAttribute('target', '_blank');
            a_tag.setAttribute('href', href);
            a_tag.click();
        }
        else
        {
            notification("error", res.message);
        }

    }
    showDetailCard = async (id_order) =>
    {
        this.setState({
            showDetail:true,
            idOrder:id_order
        })
        let res = await getOderById(id_order);
        if (res.success) {
            let result = res.data.order;
            let status;
            if (result.status === "pending") {
                status = "Đang chờ xỷ lý";
            } else if (result.status === "doing") {
                status = "Đang thực hiện";
            } else {
                status = "Đã hoàn thành";
            }
            this.setState({
                numberTable: result.Table.location,
                statusOrder: status,
                dateOrder: result.create_time,
                service: "",
                items: result.items,
                sumOrder: result.revenue
            })
        }
    };
    async reloadWhenStatusOrderChange() {
        let id_order = this.state.idOrder;
        let res = await getOderById(id_order);
        if (res.success) {
            let result = res.data.order;
            let status;
            if (result.status === "pending") {
                status = "Đang chờ xỷ lý";
            } else if (result.status === "doing") {
                status = "Đang thực hiện";
            } else {
                status = "Đã hoàn thành";
            }
            this.setState({
                numberTable: result.Table.location,
                statusOrder: status,
                dateOrder: result.create_time,
                service: "",
                items: result.items,
                sumOrder: result.revenue
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        ee.on("change_status",(newStatus) =>{
            this.setState({changeStatus: newStatus})
            console.log("change status");
        });
        if(this.state.changeStatus)
        {
            this.setState({changeStatus:false})
            this.reloadWhenStatusOrderChange();
        }

    }

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
                            <div className="group-detail">
                                <label>Thanh toán hóa đơn : </label>
                                <button className="btn-print" onClick={this.toggleOpenBill}>
                                    <span className="icon-print"></span>
                                    Thanh toán

                                </button>
                                <Confirm show={this.state.openBill}
                                         onClose={this.toggleOpenBill}
                                         addNew={this.printBill}
                                         brandButton={"Có "}
                                         childrenContent={
                                             <div>Bạn có muốn xuất hóa đơn không? </div>
                                         }/>
                            </div>
                        </div>
                   </div>
               </div>
           </div>
        );
    }
}
export default Order;