import React from 'react';
import "./style.css";
import {getListOrder, updateStatusOrder} from "../../api/order-api";
import {notification} from "../../util/noti";
import Card from "../card/card";

class Doing extends React.Component{
    constructor(props){
        super(props);
        this.drop=this.drop.bind(this);
        this.allowDrop=this.allowDrop.bind(this);
        this.reloadWhenListDoingChange = this.reloadWhenListDoingChange.bind(this);
        this.state={
            listDoing:[]
        }
    }
    allowDrop(event){
        event.preventDefault();
    }
    async reloadWhenListDoingChange()
    {
        const resDoing = await getListOrder("doing");

        if(resDoing.success)
        {
            this.setState({listDoing: resDoing.data.orders})
        }
        else {
            notification("error", resDoing.message);
        }
    }
    async drop(event){
        event.preventDefault();
        let id_order = event.dataTransfer.getData("text");
        const res = await updateStatusOrder({status:"doing"}, id_order);
        if(res.success)
        {
            let data = document.getElementById(id_order);
            //document.getElementById("list_doing").appendChild(data);
            event.target.appendChild(data)
        }
        else {
            notification("error", res.message);
        }
    }
    componentDidMount() {
        console.log("1");
       this.reloadWhenListDoingChange();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.listDoing.length !== prevState.listDoing.length)
        {
            console.log("did update doing")
            this.reloadWhenListDoingChange();
        }
    }
    render() {

        return(
            <div className="doing">
                <div className="title">Đang thực hiện </div>
                <div className="list-card" id={"list_doing"} onDrop={(e) => this.drop(e)} onDragOver={this.allowDrop}>
                    {
                        (this.state.listDoing || []).map((e, index) =>{
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
export default Doing;