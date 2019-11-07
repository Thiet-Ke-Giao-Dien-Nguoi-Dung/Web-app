import React from "react";
import "./style.css"
import PropTypes from "prop-types";

class GetByNumberPages extends React.Component{
    render() {
        return(
            <div className="pagination-custom">
                <ul id="page-numbers">
                    {
                        this.props.pageNumbers.map(number => {
                            if (this.props.currentPage === number) {
                                return (
                                    <li key={number} id={number} className="active">
                                        {number}
                                    </li>
                                )
                            }
                            else {
                                return (
                                    <li key={number} id={number} onClick={this.props.chosePage} >
                                        {number}
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
        );
    }
}
GetByNumberPages.propTypes = {
    chosePage: PropTypes.func.isRequired,
    pageNumbers:PropTypes.array,
    currentPage:PropTypes.number
};
export default GetByNumberPages;