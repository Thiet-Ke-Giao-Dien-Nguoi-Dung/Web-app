import React from "react";
import "./style.css";

class TotalRevenue extends React.Component{
    render() {
        return(
        <div className="container-total">
            <div className="btn">
                <label>Từ: </label>
                <input type="date"/>
                <label>Đến:  </label>
                <input type="date"/>
            </div>
            <div className="body">
                linechart
            </div>
        </div>);
    }
}
export default TotalRevenue;