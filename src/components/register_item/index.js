import React from 'react';
import "./style.css";
import axios from 'axios';

class RegisterItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name:"",
            user_name:"",
            password:"",
            repassword:""
        }
    }
    typingText = (event) =>{
        let nam = event.target.name;
        let tex = event.target.value;
        this.setState({[nam]:tex})
    }
    componentDidMount() {
        axios.post("18.162.115.131:3001/api/wa/register",{
            name:this.state.name,
            user_name:this.state.user_name,
            password:this.state.password
        })
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        if(!this.state.name)
            alert("nhap thieu")
        if(!this.state.user_name)
            alert("nhap thieu")
        if(!this.state.password)
            alert("nhap thieu")
        if(!this.state.repassword)
            alert("nhap thieu")
        if(this.state.password !== this.state.repassword)
        {
            alert("mat khau khong trung khop")
        }
    }
    render()
    {
        return(

            <div className="row form-group">
                <label className="register-form-label">{this.props.title}</label>
                <div className="col-md">
                    <input className="form-control" type="text" name={this.props.name} onChange={this.typingText}/>
                </div>
            </div>
        );
    }
}
export default RegisterItem;