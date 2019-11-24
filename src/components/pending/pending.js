import React from 'react';
import "./style.css";
import {getListOrder, updateStatusOrder} from "../../api/order-api";
import {notification} from "../../util/noti";
import Card from "../card/card";

class Pending extends React.Component{
    constructor(props){
        super(props);
        this.drop=this.drop.bind(this);
        this.allowDrop=this.allowDrop.bind(this);
        this.reloadWhenListPendingChange = this.reloadWhenListPendingChange.bind(this);
        this.state={
            listPending:[]
        }
    }
    async reloadWhenListPendingChange()
    {
        const resPending = await getListOrder("pending");

        if(resPending.success)
        {
            this.setState({listPending: resPending.data.orders})
        }
        else {
            notification("error", resPending.message);
        }
    }
    allowDrop(event){
        event.preventDefault();
    }
    async drop(event){
        event.preventDefault();
        let id_order = event.dataTransfer.getData("Text");
        const res = await updateStatusOrder({status:"pending"}, id_order);
        if(res.success)
        {
            this.reloadWhenListPendingChange();
        }
        else {
            notification("error", res.message);
        }
    }
    componentDidMount() {
        this.reloadWhenListPendingChange();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.listPending.length !== prevState.listPending.length)
        {
            this.reloadWhenListPendingChange();
        }
    }

    render() {

        return(
            <div className="pending" >
                <div className="title">Đang chờ xử lý</div>
                <div className="list-card" onDrop={this.drop} onDragOver={this.allowDrop}>
                    {
                        (this.state.listPending || []).map((e, index) =>{
                            return <Card key={e.id_order}
                                         idCard={e.id_order}
                                         numberTable = {e.Table.location}
                                         dateOrder = {e.create_time}
                                         listCard = {e.items}
                            />
                        })
                    }
                </div>
            </div>
        );
    }
}
export default Pending;