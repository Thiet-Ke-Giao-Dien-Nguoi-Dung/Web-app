import React from "react";
import "./style.css";
import PropTypes from "prop-types";

class Pagination extends React.Component{
    render() {
        return (
            <div className="news-per-page">
                Đang hiển thị: &nbsp; &nbsp;
                <select defaultValue={this.props.page_size} onChange={this.props.select} >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>


                </select>

            </div>
        );
    }
}
Pagination.propTypes = {
    select: PropTypes.func.isRequired
};
export default Pagination;