import React from 'react';
import "./style.css";
import {Link , Redirect} from "react-router-dom";
import axios from 'axios';

const API_LOGIN = "http://18.162.115.131:3001/api/wa/login";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        localStorage.removeItem("token");
        const token = localStorage.getItem("token");

        let loggedIn = true;
        if(token == null)
        {
            loggedIn = false
        }
        this.state={
            user_name:"",
            password:"",
            loggedIn
        }

    }
    handleChange(e){
        let user = e.target.name;
        let pass = e.target.value;

        this.setState({[user]: pass})

    }
    async handleLogin(event){
        var me= this;
        event.preventDefault();
        const username = this.state.user_name;
        const password = this.state.password;
        if(username && password)
        {
            axios.post(API_LOGIN, {
                user_name: this.state.user_name,
                password: this.state.password
            })
                .then(function (response) {
                    if(response.data.success)
                    {
                        localStorage.setItem("token",response.data.data.token);
                        me.setState({loggedIn:true});
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
            return <Redirect to='/dashboard'/>
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
                        <Link to="/" className="lin link-forget-pass">Quên mật khẩu ?</Link>
                    </div>
                    <button className="submit-login" type="button" onClick={this.handleLogin}>Đăng nhập </button>
                </form>
            </div>
        );
    }
}
export default Login;