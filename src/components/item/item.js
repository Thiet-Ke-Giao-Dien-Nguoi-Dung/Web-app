import React from "react";
import "./style.css";
import {getCategories} from "../../api/category-api";
import {getItems} from "../../api/item-api";
import iconBin from "../employee/icons/bin-26.png";

class Item extends React.Component{
    constructor(props)
    {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state={
            categories:[],
            items:[],
            recordCategoryId:""
        }
    }

    async handleSelect(event){
        const selectedIndex = event.target.options.selectedIndex;
        const id_category=event.target.options[selectedIndex].getAttribute('data-key');

        const response = await getItems(id_category);
        if(response.success)
        {
            this.setState({items: response.data.items});
            console.log(this.state.items);
        }
        else {
            console.log(response.message);
        }
    }
    async componentDidMount()
    {
        const response = await getCategories();
        if(response.success)
        {
            this.setState({categories:response.data.categories});
            console.log(this.state.categories)
        }

        else
            alert(response);

    }

    render() {

        return(
        <div className="container-item">
            <div className="btn">
                <button className="add-new" onClick={this.toggleModal}>+ Thêm mới sản phẩm  </button>
            </div>
            <div className="dropdown">
                <select defaultValue="" onChange={this.handleSelect} >
                    <option key={""} data-key={""}>Chọn tất cả </option>
                    {
                        (this.state.categories || []).map((e) => {
                            return <option key={e.id_category} data-key={e.id_category}>{e.name}</option>
                        })
                    }
                </select>
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

                    {
                        (this.state.items || []).map((e, index) => {
                            return <tr key={e.id_item}>
                                <td>{index + 1}</td>
                                <td>{e.image}</td>
                                <td>{e.name}</td>
                                <td>{e.price}</td>
                                <td>{e.status}</td>
                                <td className="title-del"><img src={iconBin} alt="icon-bin" className="btn-delete" onClick={()=>this.handleDeleteEm(e.id_employees)}/></td>
                            </tr>;
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
        );
    }

}
export default Item;