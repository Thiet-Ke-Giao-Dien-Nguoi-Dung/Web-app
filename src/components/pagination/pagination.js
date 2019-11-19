import React from "react";
import "./style.css";
import PropTypes from "prop-types";

class Pagination extends React.Component{
    render() {
        return (
            <div className="news-per-page">
                <select defaultValue="0" onChange={this.props.select} >
                    <option value="0" disabled>Hiển thị </option>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>


                </select>

            </div>
        );
    }
}
Pagination.propTypes = {
    select: PropTypes.func.isRequired
};
export default Pagination;