import React from 'react';
import "./style.css";
import axios from 'axios';
import Modal from "../Modal/Modal"

const API_GET_RESTAURANT = "http://18.162.115.131:3001/api/wa/restaurants";
const API_CREATE_RESTAURANT = "http://18.162.115.131:3001/api/wa/restaurants";

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddNew = this.handleAddNew.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            restaurants:[],
            isOpen: false ,
            nameRes:"",
            addressRes:"",
            tableCount:""
        }
    }
    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleChange(e){
        var nam = e.target.name;
        var tex = e.target.value;
        this.setState({[nam]:tex});
    }
    async handleAddNew(e)
    {
        e.preventDefault();

        axios.post(API_CREATE_RESTAURANT, {
            name:this.state.nameRes,
            address:this.state.addressRes,
            table_count:this.state.tableCount
        },{
            headers:{
                'Content-Type': 'application/json',
                "token":localStorage.getItem("token")
            }
        })
            .then((response) => {
                if(response.data.success)
                {
                    console.log("success add new restaurant");
                }
                else
                {
                    alert(response.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
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
            <div className="menu-setting">
                <h2>Settings</h2>
            </div>
            <div className="content-set">
                <div className="header-setting">
                    <button className="add-new-restaurant" onClick={this.toggleModal}>
                        +  Thêm mới nhà hàng
                    </button>
                    <Modal show={this.state.isOpen}
                           onClose={this.toggleModal}
                           title="Thêm mới nhà hàng "
                           onSubmit={this.handleAddNew}>
                        <form>
                            <div className="modal-group">
                                <label>Tên nhà hàng: </label>
                                <input type="text" name="nameRes" onChange={this.handleChange}/>
                            </div>
                            <div className="modal-group">
                                <label>Địa chỉ: </label>
                                <input type="text" name="addressRes" onChange={this.handleChange}/>
                            </div>
                            <div className="modal-group">
                                <label>Số bàn: </label>
                                <input type="text" name="tableCount" onChange={this.handleChange}/>
                            </div>
                        </form>

                    </Modal>
                </div>

                <div className="content-setting">
                    <div className="block-table">
                        <table className="table-setting">
                            <thead>
                            <tr>
                                <th>Mã nhà hàng </th>
                                <th>Tên nhà hàng</th>
                                <th>Địa chỉ </th>
                            </tr>
                            </thead>
                            <tbody>
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
            </div>

        </div>);
    }
}
export default Setting;
