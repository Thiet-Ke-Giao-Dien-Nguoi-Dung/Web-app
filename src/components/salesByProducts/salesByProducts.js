import React from "react";
import "./style.css";

class SalesByProducts extends React.Component{
    render() {
        return( <div className="container-product">
            <div className="btn">
                <label>Từ: </label>
                <input type="date"/>
                <label>Đến: </label>
                <input type="date"/>

            </div>
            <div className="tbl-product">
               <table>
                   <thead>
                    <tr>
                        <th>STT</th>
                        <th>Ảnh sản phẩm </th>
                        <th></th>
                        <th>STT</th>
                    </tr>
                   </thead>
               </table>
            </div>
        </div>
        );
    }
}
export default SalesByProducts;