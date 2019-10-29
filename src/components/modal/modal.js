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


                    <div className="modal-header">
                        <h2 className="modal-title">{this.props.title}</h2>
                        {this.props.childrenButtonClose}
                        {/*<button className="btn-close" onClick={this.props.onClose}>
                            x
                        </button>*/}
                    </div>


                    <div className="modal-content">
                        {this.props.childrenContent}
                    </div>


                    <div className="modal-help">
                        {this.props.childrenHelp}
                    </div>

                    <div className="modal-footer">
                        {this.props.childrenFooter}
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    childrenContent: PropTypes.node,
    childrenHelp: PropTypes.node,
    childrenFooter: PropTypes.node,
    childrenButtonClose: PropTypes.node
};

export default Modal;