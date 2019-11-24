import React from 'react';
import "./style.css";
import {getListOrder, updateStatusOrder} from "../../api/order-api";
import {notification} from "../../util/noti";
import Card from "../card/card";

class Done extends React.Component{
    constructor(props){
        super(props);
        this.drop=this.drop.bind(this);
        this.allowDrop=this.allowDrop.bind(this);
        this.reloadWhenListDoneChange = this.reloadWhenListDoneChange.bind(this);
        this.state={
            listDone:[]
        }
    }
    async reloadWhenListDoneChange()
    {
        const resDone = await getListOrder("done");

        if(resDone.success)
        {
            this.setState({listDone: resDone.data.orders})
        }
        else {
            notification("error", resDone.message);
        }
    }
    allowDrop(event){
        event.preventDefault();
    }

    async drop(event){
        event.preventDefault();
        let id_order = event.dataTransfer.getData("Text");

        const res = await updateStatusOrder({status:"done"}, id_order);
        if(res.success)
        {
            this.reloadWhenListDoneChange();
            event.target.appendChild(document.getElementById(id_order));

        }
        else {
            notification("error", res.message);
        }


    }
    componentDidMount() {
        this.reloadWhenListDoneChange()

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.listDone.length !== prevState.listDone.length)
        {
            this.reloadWhenListDoneChange();
        }
    }

    render() {

        return(
            <div className="done">
                <div className="title">Đã hoàn thành </div>
                <div className="list-card" onDrop={this.drop} onDragOver={this.allowDrop}>
                    {
                        (this.state.listDone || []).map((e, index) =>{
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
export default Done;