import React from 'react';
import "./style.css";
import {getCategories, createCategory, deleteCategory, editCategory} from "../../api/category-api";
import iconEdit from "./icons/icons8-edit-26.png";
import iconBin from "./icons/bin-26.png"
import Modal from "../modal/modal";
import {notification} from "../../util/noti";
import Confirm from "../confirm-alert/confirm"

class Category extends React.Component{
    constructor(props)
    {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModalEdit = this.toggleModalEdit.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.handleAddNewCategory=this.handleAddNewCategory.bind(this);
        this.handleDeleteCategory=this.handleDeleteCategory.bind(this);
        this.handleEditCategory = this.handleEditCategory.bind(this);

        this.toggleDelete = this.toggleDelete.bind(this);
        this.toggleConfirmDelete = this.toggleConfirmDelete.bind(this);

        this.state={
            categories:[],
            nameCategory:"",
            isOpen:false,
            isOpenEdit:false,
            confirmDelete:false,
            idCategoryEdit:"",
            idCategoryDel:"",
            nameCategoryEdit:"",
            changeCategories: false

        }
    }
    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen,
            nameCategory:""
        });
    }
    toggleModalEdit(id_cate, nameCate)
    {
        this.setState({
            isOpenEdit: !this.state.isOpenEdit,
            idCategoryEdit: id_cate,
            nameCategoryEdit:nameCate,

        });
    }
    toggleDelete(){
        this.setState({
            confirmDelete: !this.state.confirmDelete
        })
    };
    toggleConfirmDelete(id_cate)
    {
        this.setState({
            confirmDelete: true,
            idCategoryDel:id_cate,

        })
    }
    handleChange(e){
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]:tex});
    }
    async handleAddNewCategory() {
        const {nameCategory} = this.state;
        let data ={
            category_name:nameCategory
        };
        if(nameCategory)
        {
            let response= await createCategory(data);
            if(response.success)
            {
                this.toggleModal();
                notification("success", "Thêm mới loại sản phẩm thành công ");
                this.setState({
                    changeCategories:true,
                    nameCategory: ""
                })
            }
            else
                notification("error", response.message)
        }
        else {
            notification("warning","Xin điền thông tin đầy đủ " )
        }
    }
    async handleEditCategory(){
        const {nameCategoryEdit, idCategoryEdit} = this.state;
        if(nameCategoryEdit)
        {
            let data={
                category_name: nameCategoryEdit
            };
            let response = await editCategory(idCategoryEdit, data);
            if(response.success)
            {
                this.toggleModalEdit();
                this.setState({
                    changeCategories:true
                });
                notification("success", "Chỉnh sửa thông tin loại sản phẩm thành công ")
            }
            else
            {
                notification("error", response.message)
            }
        }
        else {
            notification("warning","Xin điền thông tin đầy đủ " );
        }
    }
    async handleDeleteCategory() {
        let id_cate = this.state.idCategoryDel;
        const response = await deleteCategory(id_cate);
        if(response.success)
        {
            this.toggleDelete();
            this.setState({
                changeCategories:true
            });
            notification("success", "Xóa loại sản phẩm thành công ");
        }
        else {
            notification("error", response.message)
        }
    }

    async reloadWhenCategoriesChange()
    {
        const res= await getCategories();
        if(res.success)
        {
            this.setState({categories:res.data.categories});
        }
        else
            notification("error", res.message);
    }
    componentDidMount()
    {
        this.reloadWhenCategoriesChange();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.changeCategories)
        {
            this.reloadWhenCategoriesChange();
            this.setState({changeCategories: false})
        }
    }

    render() {
        return(
            <div className="container-category">
                <div className="big-group">
                <div className="btn">
                    <button className="add-new" onClick={this.toggleModal}>+ Thêm mới loại sản phẩm  </button>
                    <Modal  show={this.state.isOpen}
                            onClose={this.toggleModal}
                            title="Thêm mới loại "
                            childrenContent={
                                <form>
                                    <div className="modal-group">
                                        <label>Loại sản phẩm: </label>
                                        <input type="text" name="nameCategory" onChange={this.handleChange} value={this.state.nameCategory}/>
                                    </div>
                                </form>
                            }
                            addNew={this.handleAddNewCategory}
                            brandButton="Thêm mới "/>
                    <Modal  show={this.state.isOpenEdit}
                            onClose={this.toggleModalEdit}
                            title="Chỉnh sửa loại "
                            childrenContent={
                                <form>
                                    <div className="modal-group">
                                        <label>Loại: </label>
                                        <input type="text" name="nameCategoryEdit" onChange={this.handleChange} value={this.state.nameCategoryEdit}/>
                                    </div>
                                </form>
                            }
                            addNew={this.handleEditCategory}
                            brandButton="Chỉnh sửa "/>
                    <Confirm show={this.state.confirmDelete}
                             onClose={this.toggleDelete}
                             addNew={this.handleDeleteCategory}
                             brandButton={"Có "}
                             childrenContent={
                                 <div>Bạn có chắc chắn muốn xóa? </div>
                             }/>
                </div>
                </div>
                <div className="tbl-category">
                    <table>
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Loại sản phẩm </th>
                            <th className="title-edit">Sửa </th>
                            <th className="title-del">Xoá </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (this.state.categories || []).map((e, index) => {
                                    return <tr key={e.id_category}>
                                        <td>{index + 1}</td>
                                        <td>{e.name}</td>
                                        <td className="title-edit"><img src={iconEdit} alt="icon-edit" className="btn-edit" onClick={() => this.toggleModalEdit(e.id_category, e.name)}/></td>
                                        <td className="title-del"><img src={iconBin} alt="icon-bin" className="btn-delete" onClick={() => this.toggleConfirmDelete(e.id_category)}/></td>
                                    </tr>;
                                }
                            )
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}
export default Category;