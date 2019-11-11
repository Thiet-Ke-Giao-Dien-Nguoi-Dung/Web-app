import React from "react";
import "./style.css";
import PropTypes from "prop-types";

class Pagination extends React.Component{
    render() {
        return (
            <div className="news-per-page">
                <select defaultValue="1" onChange={this.props.select} >
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="20">20</option>
                </select>

            </div>
        );
    }
}
Pagination.propTypes = {
    select: PropTypes.func.isRequired
};
export default Pagination;