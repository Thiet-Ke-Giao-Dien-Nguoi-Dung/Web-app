import React from 'react';
import "./style.css";
import {getListOrder, updateStatusOrder} from "../../api/order-api";
import {notification} from "../../util/noti";
import Card from "../card/card";
import PropTypes from 'prop-types';
import initSocket from "../../util/initSocketIO";
import ee from "../../util/events";


class Status extends React.Component {
    constructor(props) {
        super(props);
        this.drop = this.drop.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
        this.reloadWhenListStatusChange = this.reloadWhenListStatusChange.bind(this);
        this.state = {
            listStatus: [],
            nStatus: this.props.nameStatus
        }
    }

    allowDrop(event) {
        event.preventDefault();
    }

    async drop(event) {
        event.preventDefault();
        let cardText = event.dataTransfer.getData("text");
        let card = JSON.parse(cardText);
        let id_order = card.id;
        let statusCard = card.status;
        if (statusCard !== this.state.nStatus) {
            const res = await updateStatusOrder({status: this.state.nStatus}, id_order);
            if (res.success) {
                // let data = document.getElementById(id_order);
                // document.getElementById(this.props.idStatus).appendChild(data);
                const result = await getListOrder(this.state.nStatus);
                if (result.success) {
                    ee.emit("change_order_in_" + statusCard, {});
                    this.setState({listStatus: result.data.orders});
                } else {
                    notification("error", result.message);
                }
            } else {
                notification("error", res.message);
            }
         }
        //else {
        //     let data = document.getElementById(id_order);
        //     document.getElementById(this.props.idStatus).appendChild(data);
        // }
    }

    async reloadWhenListStatusChange() {
        const result = await getListOrder(this.state.nStatus);

        if (result.success) {
            this.setState({listStatus: result.data.orders})
        } else {
            notification("error", result.message);
        }
    }

    componentDidMount() {
        this.reloadWhenListStatusChange();
        let id_restaurant = localStorage.getItem("id_restaurant");
        initSocket("create_order_" + id_restaurant, (msg) => {
            this.reloadWhenListStatusChange();
        });
        ee.on("change_order_in_" + this.state.nStatus,() => {
            this.reloadWhenListStatusChange();
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        return (
            <div className={this.props.nameStatus}>
                <div className="title">{this.props.titleStatus} </div>
                <div className="list-card" id={this.props.idStatus} onDrop={(e) => this.drop(e)}
                     onDragOver={this.allowDrop}>
                    {
                        (this.state.listStatus || []).map((e, index) => {
                            return <Card key={e.id_order}
                                         idCard={e.id_order}
                                         numberTable={e.Table.location}
                                         dateOrder={e.create_time}
                                         listCard={e.items}
                                         statusOrder={e.status}
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
    idStatus: PropTypes.string
};
export default Status;