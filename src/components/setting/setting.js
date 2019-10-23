import React from 'react';
import "./style.css";
import axios from 'axios';

const API_GET_RESTAURANT = "http://18.162.115.131:3001/api/wa/restaurants";

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            restaurants:[],
        }
    }
    componentDidMount()
    {
        axios.get(API_GET_RESTAURANT, {
            headers:{
                'Content-Type':"application/json",
                "token": localStorage.getItem("token")
            }
        }).then((response) => {
            this.setState({restaurants: response.data.data.restaurants});
        })
        .catch(function (err) {
            console.log(err);
        })

    }
    render()
    {
        return(
        <div>
            <div className="menu">
                <h1>Setting</h1>
            </div>
            <div className="content">
                <div className="header-setting">
                </div>

                <div className="content-setting">
                    <table className="table-setting">
                        <thead>
                            <tr>
                                <th>Mã nhà hàng </th>
                                <th>Tên nhà hàng</th>
                                <th>Địa chỉ </th>
                            </tr>
                        </thead>
                        <tbody id="body-tbl-res">
                        {
                            (this.state.restaurants || []).map(e => {
                                    return <tr key={e.id_restaurant}>
                                        <td>{e.id_restaurant}</td>
                                        <td>{e.name}</td>
                                        <td>{e.address}</td>
                                    </tr>;
                                }
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>);
    }
}
export default Setting;
