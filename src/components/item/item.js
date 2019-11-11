import React from "react";
import "./style.css";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
/*import Pagination from "../pagination/pagination";
import GetByNumberPages from "../getByNumberPages/getByNumberPages";*/
import {getCategories} from "../../api/category-api";

class Item extends React.Component{
    constructor(props)
    {
        super(props);
        this.chosePage = this.chosePage.bind(this);
        this.select = this.select.bind(this);
        this.state={
            categories:[],
            items:[]
        }
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
    async componentDidMount()
    {
        const response = await getCategories();
        console.log(response);
        if(response.success)
            this.setState({categories:response.data.categories});
        else
            alert(response.message);

    }
    render() {
        const options=[];
        (this.state.categories || []).map((e) =>{
            return options.push(e.name);
        });
        const defaultOption = options[0];


        /*const currentPage = this.state.currentPage;
        const recordPerPage = this.state.recordPerPage;
        const indexOfLastNews = currentPage * recordPerPage;
        const indexOfFirstNews = indexOfLastNews - recordPerPage;
        const currentTodos = this.state.items.slice(indexOfFirstNews, indexOfLastNews);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.items.length / recordPerPage); i++) {
            pageNumbers.push(i);
        }*/

        return(
        <div className="container-item">
            <div className="btn">
                <button className="add-new" onClick={this.toggleModal}>+ Thêm mới sản phẩm  </button>
            </div>
            <div className="dropdown">
                <Dropdown className="category" options={options} onChange={this._onSelect} value={defaultOption} placeholder="Chọn danh mục sản phẩm " />
            </div>

            <div className="tbl-item">
                <table>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Ảnh sản phẩm </th>
                        <th>Tên sản phẩm </th>
                        <th>Giá </th>
                        <th>Trạng thái </th>
                        <th className="title-edit">Sửa </th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
{/*
                <Pagination select={this.select}/>
*/}
{/*
                <GetByNumberPages chosePage={this.chosePage} pageNumbers={pageNumbers} currentPage={this.state.currentPage}/>
*/}
            </div>
        </div>
        );
    }

}
export default Item;