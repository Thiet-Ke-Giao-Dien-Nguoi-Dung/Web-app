import React from 'react';
import "./style.css";
import {Link} from "react-router-dom";
import axios from "axios";

const API_REGISTER = "http://18.162.115.131:3001/api/wa/register";

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.handleRegister= this.handleRegister.bind(this);
        this.state={
            name_register:"",
            user_name:"",
            password:"",
            repassword:"",
        }
    }

    handleChange = (event) =>{
        let nam = event.target.name;
        let tex = event.target.value;
        this.setState({[nam]:tex})
    }

    async handleRegister(event){
        event.preventDefault();
        var me=this;
        const name = this.state.name_register;
        const username = this.state.user_name;
        const password = this.state.password;
        const repassword = this.state.repassword;
        if(name && username && password && repassword && password === repassword)
        {
            axios.post(API_REGISTER, {
                name:name,
                user_name: username,
                password: password
            })
                .then(function (response) {
                    console.log(response.data)
                    if(response.data.success)
                        me.props.history.push('/login')
                    else
                        alert(response.data.message)
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error.data.data.message)

                });
        }
        else{
            if(password !== repassword)
                alert("Mật khẩu không khớp ")
            alert("Xin hay điền đủ thông tin !!!")
        }

    }

    render() {

        return(
            <div>
                <form className="form-register">
                    <h1 className="register-title">Đăng kí</h1>
                    <div className="form-group">
                        <label className="label-form-register">Họ và tên </label>
                        <input className="input-register" type="text" name="name_register" onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label className="label-form-register">Tên sử dụng </label>
                        <input className="input-register" type="text" name="user_name" onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label className="label-form-register">Mật khẩu </label>
                        <input className="input-register" type="password" name="password" onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label className="label-form-register">Nhập lại mật khẩu </label>
                        <input className="input-register" type="password" name="repassword" onChange={this.handleChange} required/>
                    </div>
                    <Link to="/login" className=" lin link-login" >Tôi đã có tài khoản </Link>
                    <button className="submit-register" type="button" onClick={this.handleRegister}>Đăng kí </button>
                </form>
            </div>
        );
    }
}
export default Register;