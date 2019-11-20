import React from 'react';
import "./style.css";
import {getEmployees, addNewEmployee, deleteEmployee} from "../../api/employee-api";
import Modal from "../modal/modal";
import iconBin from "./icons/bin-26.png"
import Pagination from "../pagination/pagination";
import GetByNumberPages from "../getByNumberPages/getByNumberPages";
import {notification} from "../../util/noti";

class Employee extends React.Component{
    constructor(props)
    {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddNewEmployee = this.handleAddNewEmployee.bind(this);
        this.handleDeleteEm = this.handleDeleteEm.bind(this);
        this.chosePage = this.chosePage.bind(this);
        this.select = this.select.bind(this);

        this.state={
            incrementNumber:0,
            employees:[],
            isOpen:false,
            nameEmployee:"",
            phoneNumber:"",
            displayName:"",
            password:"",
            confirmPassword:"",
            currentPage: 1,
            recordPerPage: 10

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
    chosePage(event){
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    select(event){
        this.setState({
            recordPerPage: event.target.value
        })
    }
    async handleAddNewEmployee()
    {
        const {nameEmployee,phoneNumber,displayName, password,confirmPassword } = this.state;
        let data ={
            user_name:displayName,
            password:password,
            phone_number:phoneNumber,
            name:nameEmployee
        };
        if(nameEmployee && phoneNumber && displayName && password && confirmPassword )
        {
            if(password === confirmPassword)
            {
                const response = await addNewEmployee(data);
                if(response.success)
                {
                    const res = await getEmployees();
                    if(res.success)
                    {
                        this.toggleModal();
                        notification("success", "Thêm mới nhân viên thành công ")
                        this.setState({employees:res.data.employees});
                        this.setState({
                            nameEmployee:"",
                            phoneNumber:"",
                            displayName:"",
                            password:"",
                            confirmPassword:""
                        })


                    }
                    else
                        notification("error", res.message)

                }
                else {
                    notification("error", response.message)
                }
            }
            else {
                notification("error", "Nhập lại mật khẩu không đúng ")
            }

        }
        else {
            notification("warning", "Xin điền đủ thông tin")
        }
    }
    async handleDeleteEm(id_em)
    {
        const response = await deleteEmployee(id_em);
        if(response.success)
        {
            const res = await getEmployees();
            if(res.success)
            {
                notification("success", "Xóa nhân viên thành công ")
                this.setState({employees: res.data.employees});
            }
            else
                notification("error", res.message);
        }
        else {
            notification("error", response.message);
        }
    }
    async componentDidMount()
    {
        const response = await getEmployees();
        console.log(response);
        if(response.success)
            this.setState({employees:response.data.employees})
        else
            console.log(response.message);

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.employees.length !== prevState.employees.length)
        {
            const response = await getEmployees();
            if(response.success)
                this.setState({employees:response.data.employees})
            else
                alert(response.message);
        }
    }

    render() {
        const currentPage = this.state.currentPage;
        const recordPerPage = this.state.recordPerPage;
        const indexOfLastNews = currentPage * recordPerPage;
        const indexOfFirstNews = indexOfLastNews - recordPerPage;
        const currentTodos = this.state.employees.slice(indexOfFirstNews, indexOfLastNews);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.employees.length / recordPerPage); i++) {
            pageNumbers.push(i);
        }

        return(

        <div className="container-employee">
            <div className="title">
                Quản lý nhân viên
            </div>
            <div className="btn">
                <button className="add-new" onClick={this.toggleModal}>+ Thêm mới nhân viên</button>
                <Modal  show={this.state.isOpen}
                        onClose={this.toggleModal}
                        title="Thêm mới nhân viên "
                        childrenContent={
                            <form>
                                <div className="modal-group">
                                    <label>Họ và tên: </label>
                                    <input type="text" name="nameEmployee" onChange={this.handleChange} value={this.state.nameEmployee}/>
                                </div>
                                <div className="modal-group">
                                    <label>Số điện thoại  : </label>
                                    <input type="text" name="phoneNumber" onChange={this.handleChange} value={this.state.phoneNumber}/>
                                </div>
                                <div className="modal-group">
                                    <label>Tên sử dụng : </label>
                                    <input type="text" name="displayName" onChange={this.handleChange} value={this.state.displayName}/>
                                </div>
                                <div className="modal-group">
                                    <label>Mật khẩu : </label>
                                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
                                </div>
                                <div className="modal-group">
                                    <label>Nhập lại mật khẩu : </label>
                                    <input type="password" name="confirmPassword" onChange={this.handleChange} value={this.state.confirmPassword}/>
                                </div>
                            </form>
                        }
                        addNew={this.handleAddNewEmployee}
                        brandButton="Thêm mới "/>
            </div>
            <Pagination select={this.select}/>
            <div className="tbl-employee">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>Số điện thoại</th>
                            <th className="title-del">Xoá </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (currentTodos || []).map((e, index) => {
                                return <tr key={e.id_employees}>
                                    <td>{index + 1 + (currentPage - 1)*recordPerPage}</td>
                                    <td>{e.name}</td>
                                    <td>{e.phone_number}</td>
                                    <td className="title-del"><img src={iconBin} alt="icon-bin" className="btn-delete" onClick={()=>this.handleDeleteEm(e.id_employees)}/></td>
                                </tr>;
                            }
                        )
                    }
                    </tbody>
                </table>

                <GetByNumberPages chosePage={this.chosePage} pageNumbers={pageNumbers} currentPage={this.state.currentPage}/>
            </div>
        </div>);
    }
}
export default Employee;