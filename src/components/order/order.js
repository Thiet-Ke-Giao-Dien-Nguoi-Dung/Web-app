import React from 'react';
import "./style.css";
import Card from "../card/card";
import {getListOrder} from "../../api/order-api";
import {notification} from "../../util/noti";

class Order extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            listPending:[],
            listDoing:[],
            listDone:[]
        }
    }
    async componentDidMount() {
        /*const resPending = await getListOrder("pending");
        const resDoing = await getListOrder("doing");*/
        const resDone = await getListOrder("done");

        /*if(resPending.success)
        {
            console.log("pending")
            console.log(resPending.data.orders)
            this.setState({listPending: resPending.data.orders})
        }
        else {
            notification("error", resPending.message);
        }
        if(resDoing.success)
        {
            console.log("doing")
            console.log(resDoing.data.orders);
            this.setState({listDoing: resPending.data.orders})
        }
        else {
            notification("error", resDoing.message);
        }*/
        if(resDone.success)
        {
            console.log("done")
            console.log(resDone.data.orders);
            this.setState({listDone: resDone.data.orders})
            console.log(this.state.listDone)
        }
        else {
            notification("error", resDone.message);
        }

    }

    render()
    {
        return(
        <div className="container-order">
            <div className="panel">
                <div className="title">
                    <label>Waiting</label>
                </div>
                <div className="body">
                </div>
            </div>
            <div className="panel">
                <div className="title">
                    <label>Doing</label>
                </div>
                <div className="body">
                </div>
            </div>
            <div className="panel">
                <div className="title">
                    <label>Done</label>
                </div>
                <div className="body">
                    {
                        (this.state.listDone || []).map((e, index) =>{
                            return <Card key={e.id_order}
                                         numberTable = {e.Table.location}
                                         dateOrder = {e.create_time}
                                         listCard = {e.items}
                                    />
                        })
                    }

                </div>
            </div>
        </div>);
    }
}
export default Order;