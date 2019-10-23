import React from 'react';
import "./style.css";
import {Link , Redirect} from "react-router-dom";
import axios from 'axios';
import Modal from "../Modal/Modal";

const API_LOGIN = "http://18.162.115.131:3001/api/wa/login";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);

        const token = localStorage.getItem("token");

        let loggedIn = true;
        if(token == null)
        {
            loggedIn = false
        }
        this.state={
            isOpen:false,
            user_name:"",
            password:"",
            loggedIn
        }

    }
    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleChange(e){
        let user = e.target.name;
        let pass = e.target.value;

        this.setState({[user]: pass})

    }
    async handleLogin(event){
        event.preventDefault();

        const username = this.state.user_name;
        const password = this.state.password;

        if(username && password)
        {
            axios.post(API_LOGIN, {
                user_name: username,
                password: password
            })
                .then((response) => {
                    if(response.data.success)
                    {
                        localStorage.setItem("token",response.data.data.token);
                        this.setState({loggedIn:true});
                    }
                    else
                    {
                        alert(response.data.message);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else
        {
            alert("Xin hãy điền đủ thông tin !!")
        }

    }

    render() {
        if(this.state.loggedIn)
        {
            return <Redirect to='/home'/>
        }
        return(
            <div>
                <form className="form-login">
                    <h1 className="login-title">Đăng nhập </h1>
                    <div className="form-group">
                        <label className="label-form-login">Tên sử dụng </label>
                        <input className="input-login" type="text" required name="user_name" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label className="label-form-login">Mật khẩu </label>
                        <input className="input-login" type="password" required name="password" onChange={this.handleChange}/>
                    </div>
                    <div className="group-link-login">
                        <Link to="/register" className="lin">Đăng kí</Link>
                        <a href="#" className="lin link-forget-pass" onClick={this.toggleModal}>Quên mật khẩu ?</a>
                        <Modal show={this.state.isOpen}
                               onClose={this.toggleModal}
                               title="Quên mật khẩu "
                            >
                            <form>
                                <div className="modal-group">
                                    <label>Nhập email của bạn: </label>
                                    <input type="text"/>
                                </div>
                            </form>

                        </Modal>
                    </div>
                    <button className="submit-login" type="button" onClick={this.handleLogin}>Đăng nhập </button>
                </form>
            </div>
        );
    }
}
export default Login;