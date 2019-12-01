import React from 'react';
import PropTypes from 'prop-types';
import "./style.css"
import iconDelete from "./icons/icons8-delete-64.png";

class Confirm extends React.Component {
    render() {
        if(!this.props.show) {
            return null;
        }

        return (
            <div className="backdrop-confirm">
                <div className="modal">
                    <div className="modal-contentt">
                        <img src={iconDelete} alt="logo-delete" height={40} width={40}/>
                        <span className="message">{this.props.childrenContent}</span>
                    </div>

                    <div className="modal-footerr">
                        <div className="footer-groupp">
                            <button className="btn-modall cancel" onClick={this.props.onClose}>
                                Hủy bỏ
                            </button>
                            <button className="btn-modall confirm" onClick={this.props.addNew}>
                                {this.props.brandButton}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Confirm.propTypes = {
    brandButton: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    addNew:PropTypes.func.isRequired,
    show: PropTypes.bool,
    childrenContent: PropTypes.node,
};

export default Confirm;