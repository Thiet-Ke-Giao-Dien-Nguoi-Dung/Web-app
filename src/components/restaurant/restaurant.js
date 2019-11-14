import React from "react";
import "./style.css";
import {getInfoRestaurant, editInfoRestaurant} from "../../api/restaurant-api";

class Restaurant extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.state={
            name_restaurant:"",
            address_restaurant:"",
            count_table:""
        }
    }
    handleChange(e){
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]:tex});
    }
    async componentDidMount() {
        const response = await getInfoRestaurant();

        if(response.success)
        {
            const data = response.data.restaurants;
            this.setState({
                name_restaurant:data.name,
                address_restaurant:data.address,
                count_table:data.table_count
            });
        }
    }
    async handleUpdate()
    {
        const {name_restaurant,address_restaurant,count_table} = this.state;
        if(name_restaurant && address_restaurant && count_table)
        {
            const data = {
                name:name_restaurant,
                address:address_restaurant,
                table_count:count_table
            }
            const response = await editInfoRestaurant(data);
            console.log(response)
            if(response.success)
            {
                alert("update successful");
            }
            else
            {
                alert(response.message);
            }
        }
        else {
            alert("Xin hay dien du thong tin")
        }
    }
    render() {
        return (
            <div className="content-restaurant">
                <div className="sub-head">
                    <h2>Thông tin nhà hàng </h2>
                </div>
                <div className="body">
                    <dl className="form-group">
                        <dt>
                            <label className="brand"> Tên nhà hàng </label>
                        </dt>
                        <dd>
                            <input type="text" name="name_restaurant" className="input-text" onChange={this.handleChange} value={this.state.name_restaurant}/>
                        </dd>

                    </dl>
                    <dl className="form-group">
                        <dt>
                            <label className="brand">Địa chỉ </label>
                        </dt>
                        <dd>
                            <input type="text" name="address_restaurant" className="input-text" onChange={this.handleChange} value={this.state.address_restaurant}/>
                        </dd>
                    </dl>
                    <dl className="form-group">
                        <dt>
                            <label className="brand"> Số bàn </label>
                        </dt>
                        <dd>
                            <input type="text" name="count_table" className="input-text" onChange={this.handleChange} value={this.state.count_table}/>
                        </dd>
                    </dl>
                </div>
                <div className="footer">
                    <button className="btn-update" onClick={this.handleUpdate}>Chỉnh sửa </button>
                </div>
            </div>
        );
    }

}
export default Restaurant;