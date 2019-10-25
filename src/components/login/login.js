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
        this.toggleModalPass = this.toggleModalPass.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state={
            username:"",
            password:"",
            isOpen:true,
            isOpenPass:false
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
    toggleModalPass() {
        this.setState({
            isOpenPass: !this.state.isOpenPass
        });
    }
    render() {
        return(
            <div>
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
                               <button className="btn-forgetpass space" onClick={this.toggleModalPass}>Quên mật khẩu </button>
                               <Modal show={this.state.isOpenPass}
                                      onClose={this.toggleModalPass}
                                      title="Đăng nhập"
                                      childrenContent={
                                          <form>
                                              <div className="modal-group">
                                                  <label>Email của : </label>
                                                  <input type="email" name="email-user" onChange={this.handleChange}/>
                                              </div>
                                          </form>
                                      }
                                      childrenFooter={
                                          <div className="footer-group">
                                              <button className="btn-modal cancel" onClick={this.toggleModalPass}>
                                                  Hủy bỏ
                                              </button>
                                              <button className="btn-modal add">
                                                  Gửi
                                              </button>
                                          </div>

                                      }/>
                           </div>
                       }
                       childrenFooter={
                            <div className="footer-group">
                                <button className="btn-modal cancel" onClick={this.toggleModal}>
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