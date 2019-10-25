import React from 'react';
import Modal from "../modal/modal";
import axios from "axios";
import "./style.css";
import {Link} from "react-router-dom";

const API_REGISTER = "http://18.162.115.131:3001/api/wa/register";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            isOpen:true,
            name_register: "",
            user_name: "",
            password: "",
            repassword: "",
        }
    }
    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleChange = (event) => {
        let nam = event.target.name;
        let tex = event.target.value;
        this.setState({[nam]: tex})
    }

    async handleRegister(event) {
        event.preventDefault();
        var me = this;
        const name = this.state.name_register;
        const username = this.state.user_name;
        const password = this.state.password;
        const repassword = this.state.repassword;
        if (name && username && password && repassword && password === repassword) {
            axios.post(API_REGISTER, {
                name: name,
                user_name: username,
                password: password
            })
                .then(function (response) {
                    console.log(response.data)
                    if (response.data.success)
                        me.props.history.push('/login')
                    else
                        alert(response.data.message)
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error.data.data.message)

                });
        } else {
            if (password !== repassword)
                alert("Mật khẩu không khớp ")
            alert("Xin hay điền đủ thông tin !!!")
        }

    }
    render() {
        return(<div>
            <Modal show={this.state.isOpen}
                   onClose={this.toggleModal}
                   title="Đăng kí"
                   childrenContent={
                       <form>
                           <div className="modal-group">
                               <label>Họ và tên: </label>
                               <input type="text" name="name_register" onChange={this.handleChange}/>
                           </div>
                           <div className="modal-group">
                               <label>Tên đăng nhập : </label>
                               <input type="text" name="user_name" onChange={this.handleChange}/>
                           </div>
                           <div className="modal-group">
                               <label>Mật khẩu : </label>
                               <input type="text" name="password" onChange={this.handleChange}/>
                           </div>
                           <div className="modal-group">
                               <label>Gõ lại mật khẩu: </label>
                               <input type="text" name="repassword" onChange={this.handleChange}/>
                           </div>
                       </form>
                   }
                   childrenHelp={
                       <div className="group-link">
                           <Link to="/login" className="link-help">Tôi đã có tài khoản </Link>
                       </div>
                   }
                   childrenFooter={
                       <div className="footer-group">
                           <button className="btn-modal cancel" onClick={this.toggleModal}>
                               Hủy bỏ
                           </button>
                           <button className="btn-modal add" onClick={this.handleRegister}>
                               Đăng kí
                           </button>
                       </div>

                   }/>
        </div>
        );

    }
}
export default Register;