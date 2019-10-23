import React from 'react';
import "./style.css";
import Modal from "../Modal/Modal";
import axios from 'axios';

const API_CREATE_RESTAURANT = "http://18.162.115.131:3001/api/wa/restaurants";

class Setting extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddNew = this.handleAddNew.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            isOpen: false ,
            nameRes:"",
            addressRes:""
        };

    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleChange(e){
        var nam = e.target.name;
        var tex = e.target.value;
        console.log(this);
        this.setState({[nam]:tex});
    }
    async handleAddNew(e)
    {
        e.preventDefault();
        console.log(this.state.nameRes)
        axios.post(API_CREATE_RESTAURANT, {
            name:this.state.nameRes,
            address:this.state.addressRes
        },{
            headers:{
                'Content-Type': 'application/json',
                "token":localStorage.getItem("token")
            }
        })
            .then(function (response) {
                console.log(response)
                if(response.data.success)
                {
                    console.log("success")
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
    render()
    {
        return(
        <div>
            <div className="menu">
                <h1>Setting</h1>
            </div>
            <div className="content">
                <div className="header-setting">
                    <button className="add-new-restaurant" onClick={this.toggleModal}>
                        +  Thêm mới nhà hàng
                    </button>
                    <Modal show={this.state.isOpen}
                           onClose={this.toggleModal}
                           title="Thêm mới nhà hàng "
                           onSubmit={this.handleAddNew}>
                        <div>
                            <label>Name</label>
                            <input type="text" name="nameRes" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>Address</label>
                            <input type="text" name="addressRes" onChange={this.handleChange}/>
                        </div>

                    </Modal>
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
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>

        </div>);
    }
}
export default Setting;
