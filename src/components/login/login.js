import React from 'react';
import Modal from "../modal/modal";
import "./style.css";
import 'react-toastify/dist/ReactToastify.css';
import {Link, Redirect} from "react-router-dom";
import {login} from "../../api/authentication-api"
import {notification} from "../../util/noti";

class Login extends React.Component{

    constructor(props)
    {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.pathRegister="/register";
        this.pathDashboardOrder = "/dashboard/order";

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
    async handleLogin(){
        const {username, password} = this.state;

        if(username && password)
        {
            let data = {
                user_name:username,
                password:password
            };
            let response = await login(data);
            if(response.success)
            {
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("id_restaurant", response.data.id_restaurant);
                console.log(localStorage.getItem("token"));
                this.setState({loggedIn:true})
            }else{
                notification("error",response.message);
            }
        }
        else
        {
            notification("warning", "Something missing");
        }

    }

    render() {
        if(this.state.loggedIn === true)
        {
            return <Redirect to={this.pathDashboardOrder}/>
        }
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
                            <Link to={this.pathRegister} className="link-help">Đăng kí</Link>
                            <button className="btn-forgetpass space" onClick={this.toggleModal}>Quên mật khẩu? </button>
                            <Modal  show={this.state.isOpen}
                                    onClose={this.toggleModal}
                                    title="Quên mật khẩu "
                                    childrenContent={
                                        <form>
                                            <div className="modal-group">
                                                <label>Email của bạn : </label>
                                                <input type="email" name="email-user"/>
                                            </div>
                                        </form>
                                    }
                                    brandButton="Xác nhận "
                                    addNew={this.toggleModal}/>
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
