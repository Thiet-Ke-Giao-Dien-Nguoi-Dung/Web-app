import React from "react";
import "./style.css";
import "../../util/initSocketIO"
import {getCategories} from "../../api/category-api";
import {getItems, editItem, addNewItem} from "../../api/item-api";
import iconEdit from "./icons/icons8-edit-26.png";
import Modal from "../modal/modal";
import Pagination from "../pagination/pagination";
import GetByNumberPages from "../getByNumberPages/getByNumberPages";
import {notification} from "../../util/noti";


class Item extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddNew = this.handleAddNew.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);

        this.toggleAddNew = this.toggleAddNew.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleImageChangeInAdd = this.handleImageChangeInAdd.bind(this);

        this.handleSelectInAddNew = this.handleSelectInAddNew.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);

        this.reloadWhenChangeCategory = this.reloadWhenChangeCategory.bind(this);

        this.state = {
            categories: [],
            items: [],
            recordCategoryId: "",
            isOpenEdit: false,

            idItem: "",
            nameItem: "",
            priceItem: "",
            statusItem: "",
            change_items:false,

            isOpenAddNew: false,
            nameNewItem: "",
            imgNewItem: null,
            priceNewItem: "",
            idCategorySelected: "",
            idCategory:"",

            page_size: 5,
            page_number: 1,
            page_count: 1,
            change_category: false,
            next_page: false,
            change_page_size: false
        }
    }

    async handleAddNew() {

        const {nameNewItem, imgNewItem, priceNewItem, idCategorySelected} = this.state;
        if (nameNewItem && imgNewItem && priceNewItem && idCategorySelected) {
            let data = {
                name: nameNewItem,
                image: imgNewItem,
                price: priceNewItem,
                id_category: idCategorySelected
            };
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('image', data.image);
            formData.append('price', data.price);
            formData.append('id_category', data.id_category);
            const response = await addNewItem(formData);
            if (response.success) {
                this.toggleAddNew();
                notification("success", "Thêm mới sản phẩm thành công ")
                this.setState({
                    nameNewItem:"",
                    imgNewItem:null,
                    priceNewItem:"",
                    change_items:true
                });
                this.setState({change_items: true})
            } else {
                notification("error", response.message);
            }
        } else {
            notification("warning", "Xin điền đủ thông tin ");
        }
    }
    async handleEditItem() {
        const {idItem, nameItem, priceItem, statusItem} = this.state;
        let data={
            name:nameItem,
            price:priceItem,
            status:statusItem
        };
        const response = await editItem(idItem,data);
        if (response.success) {
            this.toggleEdit();
            notification("success", "Chỉnh sửa thông tin sản phẩm thành công ");
            this.setState({
                nameItem: "",
                priceItem: "",
                statusItem: "",
                change_items:true
            });

        } else {
            notification("warning", "Xin điền đủ thông tin ");
        }
    }
    toggleAddNew() {
        this.setState({
            isOpenAddNew: !this.state.isOpenAddNew
        })
    }
    toggleEdit(id_item, _nameItem, imageItem, _priceItem, _statusItem) {
        this.setState({
            idItem: id_item,
            nameItem: _nameItem,
            imgItem: imageItem,
            priceItem: _priceItem,
            statusItem:_statusItem,
            isOpenEdit: !this.state.isOpenEdit
        });
    }

    handleChange(e) {
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]: tex});
    }

    async handleImageChangeInAdd(event){
        let file = event.target.files[0];
        await this.setState({
            imgNewItem: file
        },() => {
            console.log("Set state oki")
        });
    };

    handleSelectInAddNew(event) {
        const selectedIndex = event.target.options.selectedIndex;
        const id_category = event.target.options[selectedIndex].getAttribute('data-key');
        this.setState({idCategorySelected: id_category});
    }

    async handleSelectCategory(event) {
        const selectedIndex = event.target.options.selectedIndex;
        const id_category = event.target.options[selectedIndex].getAttribute('data-key');
        this.setState({id_category: id_category, change_category: true});
    }

    handleSelectStatus = (event)=>{
        const selectedStatus = event.target.options.selectedIndex;
        const valueStatus = event.target.options[selectedStatus].value;
        this.setState({
            statusItem:valueStatus
        });
    };

    chosePage = (event) =>{
        this.setState({
            page_number: Number(event.target.id),
            next_page: true
        });
    };
    changePageSize = (event) => {
        this.setState({
            page_size: event.target.value,
            change_page_size: true,
            page_number: 1
        })
    };
    async componentDidMount() {
        const response = await getCategories();
        if (response.success) {
            this.setState({categories: response.data.categories});
        } else
            console.log(response.message);
        let query = {
            page_size: this.state.page_size,
            page_number: this.state.page_number - 1,
            id_category: ""
        };
        const res = await getItems(query);
        if (res.success) {
            this.setState({items: res.data.items, page_count: Math.ceil(res.data.count / this.state.page_size)});
        } else {
            console.log(res.message);
        }
    }

    reloadWhenChangeCategory = async () => {
        let query = {
            page_size: this.state.page_size,
            page_number: 0,
            id_category: this.state.id_category
        };
        const response = await getItems(query);
        if (response.success) {
            this.setState({
                items: response.data.items,
                change_category: false,
                page_count: Math.ceil(response.data.count / this.state.page_size),
                page_number: 1
            });
        } else {
            console.log(response.message);
        }
    };

    reloadWhenNextPage = async () => {
        let query = {
            page_size: this.state.page_size,
            page_number: this.state.page_number - 1,
            id_category: this.state.id_category
        };
        const response = await getItems(query);
        if (response.success) {
            this.setState({
                items: response.data.items,
                next_page: false,
            });
        } else {
            console.log(response.message);
        }
    };

    reloadWhenChangePageSize = async () => {
        let query = {
            page_size: this.state.page_size,
            page_number: 0,
            id_category: this.state.id_category
        };
        const response = await getItems(query);
        if (response.success) {
            this.setState({
                items: response.data.items,
                change_page_size: false,
                page_count: Math.ceil(response.data.count / this.state.page_size)
            });
        } else {
            console.log(response.message);
        }
    };
    reloadwhenItemsChange = async () =>{
        let query = {
            page_size: this.state.page_size,
            page_number: this.state.page_number - 1,
            id_category: this.state.id_category
        };
        const res = await getItems(query);
        if (res.success) {
            this.setState({change_items:false});
            this.setState({items: res.data.items});
        } else {
            notification("error", res.message);
        }
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.change_category){
            this.reloadWhenChangeCategory();
        }
        if(this.state.next_page){
            this.reloadWhenNextPage();
        }
        if(this.state.change_page_size){
            this.reloadWhenChangePageSize();
        }
        if(this.state.change_items)
            this.reloadwhenItemsChange();
    }

    render() {
        const currentTodos = this.state.items;
        return (
            <div className="container-item">
                <div className="big-group">
                    <div className="list-group">
                        <button className="add-new" onClick={this.toggleAddNew}>+ Thêm mới sản phẩm</button>
                        <div className="dropdown">
                            <select defaultValue={"Chọn tất cả"} onChange={this.handleSelectCategory}>
                                <option key={""} data-key={""}>Chọn tất cả</option>
                                {
                                    (this.state.categories || []).map((e) => {
                                        return <option key={e.id_category} data-key={e.id_category}>{e.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <Modal onClose={this.toggleAddNew}
                               show={this.state.isOpenAddNew}
                               title="Thêm mới sản phẩm "
                               childrenContent={
                                   <form>
                                       <div className="modal-group">
                                           <label>Tên sản phẩm : </label>
                                           <input type="text" name="nameNewItem" onChange={this.handleChange}/>
                                       </div>
                                       <div className="modal-group">
                                           <label>Ảnh sản phẩm : </label>
                                           <input style = { {border:"none"}}type="file" onChange={this.handleImageChangeInAdd}/>
                                       </div>

                                       <div className="modal-group">
                                           <label>Giá sản phẩm : </label>
                                           <input type="text" name="priceNewItem" onChange={this.handleChange}/>
                                       </div>
                                       <div className="modal-group">
                                           <label>Loại : </label>
                                           <div className="dropdown-addnew">
                                               <select defaultValue="---" onChange={this.handleSelectInAddNew}>
                                                   <option disabled>---</option>
                                                   {
                                                       (this.state.categories || []).map((e) => {
                                                           return <option key={e.id_category}
                                                                          data-key={e.id_category}>{e.name}</option>
                                                       })
                                                   }
                                               </select>
                                           </div>
                                       </div>
                                   </form>

                               }
                               addNew={this.handleAddNew}
                               brandButton="Thêm mới "/>
                        <Modal onClose={this.toggleEdit}
                               show={this.state.isOpenEdit}
                               title="Chỉnh sửa sản phẩm "
                               childrenContent={
                                   <form>
                                       <div className="modal-group">
                                           <label>Tên sản phẩm : </label>
                                           <input type="text" name="nameItem" onChange={this.handleChange}
                                                  value={this.state.nameItem}/>
                                       </div>
                                      {/*  <div className="modal-group">
                                           <label>Ảnh sản phẩm : </label>
                                           <input type="file" onChange={async  (e) => await this.setState({imgItem: e.target.files[0]})}/>
                                         </div>*/}

                                       <div className="modal-group">
                                           <label>Giá sản phẩm : </label>
                                           <input type="text" name="priceItem" onChange={this.handleChange}
                                                  value={this.state.priceItem}/>
                                       </div>
                                       <div className="modal-group">
                                           <label>Tình trạng sản phẩm : </label>
                                           <div className="dropdown-addnew">
                                               <select defaultValue={this.state.statusItem} onChange={this.handleSelectStatus}>
                                                   <option value= "in_stock">Còn hàng</option>
                                                   <option value="out_of_stock">Hết hàng </option>
                                               </select>
                                           </div>
                                       </div>
                                   </form>
                               }
                               addNew={this.handleEditItem}
                               brandButton="Chỉnh sửa "/>

                    </div>
                    <Pagination changePageSize={this.changePageSize} page_size={this.state.page_size}/>
                </div>
                <div className="tbl-item">
                    <table>
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Ảnh sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Trạng thái</th>
                            <th className="title-edit">Sửa</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            (currentTodos || []).map((e, index) => {
                                return <tr key={e.id_item}>
                                    {/*<td>{index + 1}</td>*/}
                                    <td>{index + (this.state.page_number - 1) * this.state.page_size + 1}</td>
                                    <td><img src={e.image} alt="food" height={40} width={40}/></td>
                                    <td>{e.name}</td>
                                    <td>{e.price}</td>
                                    <td>{e.status === "in_stock" ? "Còn hàng " : "Hết hàng" }</td>
                                    <td className="title-del"><img src={iconEdit} alt="icon-bin" className="btn-delete"
                                                                   onClick={() => this.toggleEdit(e.id_item, e.name, e.image, e.price, e.status)}/>
                                    </td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>

                </div>
                <GetByNumberPages chosePage={this.chosePage} pageNumbers={this.state.page_count} currentPage={this.state.page_number}/>
            </div>
        );
    }

}

export default Item;