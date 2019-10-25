import React from 'react';
import Modal from "../modal/modal";
import axios from "axios";
import "./style.css";
import {Link} from "react-router-dom";

const API_LOGIN = "http://18.162.115.131:3001/api/wa/login";

class Login extends React.Component{
    constructor(props)
    {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state={
            username:"",
            password:"",
            isOpen:false
        }
    }
    handleChange(e){
        var nam = e.target.name;
        var tex = e.target.value;
        this.setState({[nam]:tex});
    }
    async handleLogin(event){
        event.preventDefault();

        const username = this.state.username;
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
    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return(
            <div>
                <button onClick={this.toggleModal}>Đăng nhập</button>
                <Modal show={this.state.isOpen}
                       onClose={this.toggleModal}
                       title="Đăng nhập"
                       childrenContent={
                           <form>
                               <div className="modal-group">
                                   <label>Tên đăng nhập: </label>
                                   <input type="text" name="usename" onChange={this.handleChange}/>
                               </div>
                               <div className="modal-group">
                                   <label>Mật khẩu : </label>
                                   <input type="text" name="password" onChange={this.handleChange}/>
                               </div>
                            </form>
                       }
                       childrenHelp={
                           <div className="group-link">
                               <Link to="/register" className="link-help">Đăng kí</Link>
                               <Link to="/register" className="link-help space">Quên mật khẩu </Link>
                           </div>
                       }
                       childrenFooter={
                            <div className="footer-group">
                                <button className="btn-modal cancel">
                                    Hủy bỏ
                                </button>
                                <button className="btn-modal add" onClick={this.handleLogin}>
                                    Đăng nhập
                                </button>
                            </div>

                       }/>
            </div>

        );
    }
}
export default Login;