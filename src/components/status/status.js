import React from 'react';
import "./style.css";
import {getListOrder, updateStatusOrder} from "../../api/order-api";
import {notification} from "../../util/noti";
import Card from "../card/card";
import PropTypes from 'prop-types';

class Status extends React.Component{
    constructor(props){
        super(props);
        this.drop=this.drop.bind(this);
        this.allowDrop=this.allowDrop.bind(this);
        this.reloadWhenListStatusChange = this.reloadWhenListStatusChange.bind(this);
        this.state={
            listStatus:[],
            nStatus: this.props.nameStatus
        }
    }
    allowDrop(event){
        event.preventDefault();
    }
    async drop(event){
        event.preventDefault();
        let id_order = event.dataTransfer.getData("text");
        const res = await updateStatusOrder({status:this.state.nStatus}, id_order);
        if(res.success)
        {
            let data = document.getElementById(id_order);
            document.getElementById(this.props.idStatus).appendChild(data);
        }
        else {
            notification("error", res.message);
        }
    }
    async reloadWhenListStatusChange()
    {
        const resDoing = await getListOrder(this.state.nStatus);

        if(resDoing.success)
        {
            this.setState({listStatus: resDoing.data.orders})
        }
        else {
            notification("error", resDoing.message);
        }
    }
    componentDidMount() {
        this.reloadWhenListStatusChange();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.listStatus.length !== prevState.listStatus.length)
        {
            console.log("did update");
            this.reloadWhenListStatusChange();
        }
    }
    render() {

        return(
            <div className={this.props.nameStatus}>
                <div className="title">{this.props.titleStatus} </div>
                <div className="list-card" id={this.props.idStatus} onDrop={(e) => this.drop(e)} onDragOver={this.allowDrop}>
                    {
                        (this.state.listStatus || []).map((e, index) =>{
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
Status.propTypes = {
    nameStatus: PropTypes.string,
    titleStatus: PropTypes.string,
    idStatus:PropTypes.string
}
export default Status;