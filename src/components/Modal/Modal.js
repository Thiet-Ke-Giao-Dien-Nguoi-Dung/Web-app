import React from 'react';
import PropTypes from 'prop-types';
import "./style.css"

class Modal extends React.Component {
    render() {
        if(!this.props.show) {
            return null;
        }

        return (
            <div className="backdrop">
                <div className="modal">


                    <div className="header-modal">
                        <h3 className="modal-title">{this.props.title}</h3>
                        <button className="button-x" onClick={this.props.onClose}>
                            x
                        </button>
                    </div>


                    <div className="content-modal">
                        {this.props.children}
                    </div>


                    <div className="footer-modal">
                        <button className="btn-modal cancel" onClick={this.props.onClose}>Thoát</button>
                        <button className="btn-modal add" onClick={this.props.onSubmit}>Thêm </button>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit:PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;