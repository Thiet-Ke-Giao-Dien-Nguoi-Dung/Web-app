import React from 'react';
import "./style.css";
import {Link, Redirect} from "react-router-dom";
import {register} from "../../api/authentication-api";



class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            isOpen:true,
            name_register: "",
            user_name: "",
            password: "",
            repassword: "",
            restaurant:"",
            address:"",
            count_table:"",
            loggedIn:false
        }
    }
    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleChange = (event) => {
        let nam = event.target.name;
        let tex = event.target.value;
        this.setState({[nam]: tex})
    }

    async handleRegister(event) {
        event.preventDefault();
        const {name_register,user_name, password,repassword,restaurant, address, count_table} = this.state;

        if (name_register && user_name && password && repassword && password === repassword) {
            let data={
                name: name_register,
                user_name: user_name,
                password: password,
                restaurant_name:restaurant,
                restaurant_address: address,
                table_count: count_table

            }
            let res = await register(data);

            console.log(res);

            if(res.success)
            {
                this.setState({loggedIn:true});
            }
        } else {
            if (password !== repassword)
                alert("Mật khẩu không khớp ")
            alert("Xin hay điền đủ thông tin !!!")
        }

    }
    render() {
        if(this.state.loggedIn)
        {
            return <Redirect to={"/login"}/>
        }
        return(<div className="register-page">
                <div className="register-card">
                    <div className="register-card-header">
                        <h2 className="register-card-title">Đăng kí </h2>
                    </div>
                    <div className="register-card-body">
                        <form>
                            <div className="register-group">
                                <label>Họ và tên: </label>
                                <input type="text" name="name_register" onChange={this.handleChange}/>
                            </div>
                            <div className="register-group">
                                <label>Tên đăng nhập : </label>
                                <input type="text" name="user_name" onChange={this.handleChange}/>
                            </div>
                            <div className="register-group">
                                <label>Mật khẩu : </label>
                                <input type="password" name="password" onChange={this.handleChange}/>
                            </div>
                            <div className="register-group">
                                <label>Gõ lại mật khẩu: </label>
                                <input type="password" name="repassword" onChange={this.handleChange}/>
                            </div>
                            <div className="register-group">
                                <label>Tên cửa hàng: </label>
                                <input type="text" name="restaurant" onChange={this.handleChange}/>
                            </div>
                            <div className="register-group">
                                <label>Địa chỉ:  </label>
                                <input type="text" name="address" onChange={this.handleChange}/>
                            </div>
                            <div className="register-group">
                                <label>Số bàn : </label>
                                <input type="text" name="count_table" onChange={this.handleChange}/>
                            </div>

                        </form>
                    </div>
                    <div className="register-card-help">
                        <div className="group-link">
                            <Link to="/login" className="link-help">Tôi đã có tài khoản </Link>
                        </div>

                    </div>
                    <div className="register-card-footer">
                        <button className="btn-register" onClick={this.handleRegister}>
                            Đăng kí
                        </button>
                    </div>
                </div>
            </div>

        );

    }
}
export default Register;