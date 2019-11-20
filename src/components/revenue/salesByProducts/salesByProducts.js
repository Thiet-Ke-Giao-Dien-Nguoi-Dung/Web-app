import React from "react";
import "./style.css";

class SalesByProducts extends React.Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    state = {
        startDate: null,
        endDate: null
    };

    handleChange(e){
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]:tex});
    };

    render() {
        return( <div className="container-product">
            <div className="btn">
                <label>Từ: </label>
                <input type="date" name="startDate" onChange={this.handleChange}/>
                <label>Đến: </label>
                <input type="date" name="endDate" onChange={this.handleChange}/>
            </div>
            <div className="tbl-product">
               <table>
                   <thead>
                    <tr>
                        <th>STT</th>
                        <th>Ảnh sản phẩm </th>
                        <th/>
                        <th/><th>Tên sản phẩm</th>
                        <th>Giá sản phẩm</th>
                        <th>Số lượt đặt</th>
                    </tr>
                   </thead>
               </table>
            </div>
        </div>
        );
    }
}
export default SalesByProducts;