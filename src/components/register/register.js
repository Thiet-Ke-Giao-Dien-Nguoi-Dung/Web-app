import React from 'react';
import "./style.css";
import {Link } from "react-router-dom";
import RegisterItem from "../register_item";

class Register extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            array:[
                {
                    title:"Name",
                    name:"name"
                },
                {
                    title:"User name",
                    name:"user_name"
                },
                {
                    title:"Password",
                    name:"password"
                },
                {
                    title:"Confirm Password",
                    name:"repassword"
                }
            ]
        }

    }

    render() {
        return(
            <div>
                <div className="header-register"></div>
                <div className="content-register">
                    <div className="register-card">
                        <div className="register-card-header">
                            <div className="register-title">Register</div>
                        </div>
                        <form onSubmit={this.mySubmitHandler}>
                            <div className="register-card-body">
                                <RegisterItem {...this.state.array[0]} />
                                <RegisterItem {...this.state.array[0]} />
                                <RegisterItem {...this.state.array[0]} />
                                <RegisterItem {...this.state.array[0]} />
                                <div className="register-help">
                                    <Link to="/login">I have an account</Link>
                                </div>
                            </div>

                            <div className="register-card-footer">
                                <button className="button-submit-form" type="submit">
                                    <span>Register</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="footer-register"></div>
            </div>
        );
    }
}
export default Register;