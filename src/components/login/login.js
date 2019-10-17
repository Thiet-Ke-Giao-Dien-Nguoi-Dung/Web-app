import React from 'react';
import "./style.css";
import {Link } from "react-router-dom";

class Login extends React.Component{
    checkall()
    {
        document.getElementById("form-login").submit();

    }
    render() {
        return(
            <div>
                <div className="header-login"></div>
                <div className="content-login">
                    <div className="login-card">
                        <div className="login-card-header">
                            <div className="login-title">Log in</div>
                        </div>
                        <form id={"form-login"}>
                            <div className="login-card-body">
                                <div className="row form-group">
                                    <label className="login-form-label">Email:</label>
                                    <div className="col-md">
                                        <input className="form-control" type="email"/>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <label className="login-form-label">Password:</label>
                                    <div className="col-md">
                                        <input className="form-control" type="password"/>
                                    </div>
                                </div>
                                <div className="login-help">
                                    <Link to="/register">Register</Link>
                                    <a href="/#" className="forgetpassword">Forget password?</a>
                                </div>
                            </div>

                            <div className="login-card-footer">
                                <button className="button-submit-form" type="submit" onClick={this.checkall}>
                                    <span><Link to="/dashboard">Login</Link></span>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
                <div className="footer-login"></div>
            </div>
        );
    }
}
export default Login;