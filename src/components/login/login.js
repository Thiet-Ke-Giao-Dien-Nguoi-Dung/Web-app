import React from 'react';
import Modal from "../modal/modal";
import axios from "axios";
import "./style.css";
import {Link, Redirect} from "react-router-dom";
import {login} from "../../api/authentication-api"


class Login extends React.Component{

    constructor(props)
    {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        const token = localStorage.getItem("token");

        let loggedIn = true;
        if(token == null)
        {
            loggedIn = false
        }

        this.state={
            username:"",
            password:"",
            isOpen:false,
            loggedIn
        }
    }
    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleChange(e){
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]:tex});
    }
    async handleLogin(event){

        const username = this.state.username;
        const password = this.state.password;

        if(username && password)
        {
            let data = {
                user_name:username,
                password:password
            }
            let response = login(data);
            console.log(response);

        }
        else
        {
            alert("Xin hãy điền đủ thông tin !!")
        }

    }

    render() {
        /*if(this.state.loggedIn)
        {
            return <Redirect to='/home'/>
        }*/
        return(
            <div className="login-page">
                <div className="login-card">
                    <div className="login-card-header">
                        <h2 className="login-card-title">Đăng nhập </h2>
                    </div>
                    <div className="login-card-body">
                        <form>
                            <div className="login-group">
                                <label>Tên đăng nhập: </label>
                                <input type="text" name="username" onChange={this.handleChange}/>
                            </div>
                            <div className="login-group">
                                <label>Mật khẩu : </label>
                                <input type="password" name="password" onChange={this.handleChange}/>
                            </div>
                        </form>
                    </div>
                    <div className="login-card-help">
                        <div className="group-link">
                            <Link to="/register" className="link-help">Đăng kí</Link>
                            <button className="btn-forgetpass space" onClick={this.toggleModal}>Quên mật khẩu? </button>
                            <Modal  show={this.state.isOpen}
                                    onClose={this.toggleModal}
                                    title="Quên mật khẩu "
                                    childrenButtonClose={
                                        <button className="btn-close" onClick={this.toggleModal}>
                                            x
                                        </button>
                                    }
                                    childrenContent={
                                        <form>
                                            <div className="modal-group">
                                                <label>Email của bạn : </label>
                                                <input type="email" name="email-user"/>
                                            </div>
                                        </form>
                                    }
                                    childrenFooter={
                                        <div className="footer-group">
                                            <button className="btn-modal cancel" onClick={this.toggleModal}>
                                                Hủy bỏ
                                            </button>
                                            <button className="btn-modal confirm">
                                                Xác nhận
                                            </button>
                                        </div>

                                    }/>
                        </div>
                    </div>

                    <div className="login-card-footer">
                        <button className="btn-login" onClick={this.handleLogin}>
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
