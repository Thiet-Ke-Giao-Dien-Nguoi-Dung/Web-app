import React from "react";
import "./style.css";
import {changePassword} from "../../api/authentication-api";

class Password extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.state={
            old_password:"",
            new_password:"",
            confirm_password:""
        }
    }
    handleChange(e){
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]:tex});
    }
    async handleChangePassword() {
        const {old_password,new_password,confirm_password}=this.state;
        if( old_password && new_password && confirm_password)
        {
            if(new_password === confirm_password)
            {
                const data ={
                    old_password:old_password,
                    new_password:new_password,
                };
                const response = await changePassword(data);
                if(response.success)
                {
                    alert("Success");
                    this.setState({
                        old_password:"",
                        new_password:"",
                        confirm_password:"" })
                }
                else
                {
                    alert("Mật khẩu cũ không đúng ");
                }
            }
            else {
                alert("Nhập lại mật khẩu không đúng ");
            }
        }
        else {
            alert("Xin dien du thong tin");
        }
    }
    render() {
        return (
            <div className="content-password">
                <div className="sub-head">
                    <h2>Thay đổi mật khẩu </h2>
                </div>
                <div className="body">
                    <dl className="form-group">
                        <dt>
                            <label className="brand"> Mật khẩu cũ</label>
                        </dt>
                        <dd>
                            <input type="password" name="old_password" className="input-text" onChange={this.handleChange}/>
                        </dd>

                    </dl>
                    <dl className="form-group">
                        <dt>
                            <label className="brand"> Mật khẩu mới</label>
                        </dt>
                        <dd>
                            <input type="password" name="new_password" className="input-text" onChange={this.handleChange}/>
                        </dd>
                    </dl>
                    <dl className="form-group">
                        <dt>
                            <label className="brand"> Nhập lại mật khẩu mới </label>
                        </dt>
                        <dd>
                            <input type="password" name="confirm_password" className="input-text" onChange={this.handleChange}/>
                        </dd>
                    </dl>
                </div>
                <div className="footer">
                    <button className="btn-update">Thay đổi mật khẩu </button>
                </div>
            </div>
        );
    }

}
export default Password;