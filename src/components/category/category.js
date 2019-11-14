import React from 'react';
import "./style.css";
import {getCategories, createCategory, deleteCategory, editCategory} from "../../api/category-api";
import iconEdit from "./icons/icons8-edit-26.png";
import iconBin from "./icons/bin-26.png"
import Modal from "../modal/modal";


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

        this.state={
            categories:[],
            nameCategory:"",
            isOpen:false,
            isOpenEdit:false,
            idCategoryEdit:"",
            nameCategoryEdit:""

        }
    }
    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    toggleModalEdit(id_cate, nameCate)
    {
        this.setState({
            isOpenEdit: !this.state.isOpenEdit,
            idCategoryEdit: id_cate,
            nameCategoryEdit:nameCate
        });
    }
    handleChange(e){
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]:tex});
    }
    async componentDidMount()
    {
        const response = await getCategories();
        if(response.success)
            this.setState({categories:response.data.categories});
        else
            alert(response);

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.categories.length !== prevState.categories.length)
        {
            const response = await getCategories();
            console.log(response);
            if(response.success)
                this.setState({categories:response.data.categories});
            else
                alert(response.message);
        }
    }

    async handleAddNewCategory()
    {
        const {nameCategory} = this.state;
        let data ={
            category_name:nameCategory
        };
        if(nameCategory)
        {
            let response= await createCategory(data);
            if(response.success)
            {
                const res= await getCategories();
                if(response.success)
                {
                    alert("success");
                    this.setState({categories:res.data.categories});
                    this.setState({nameCategoryEdit:""})
                }
                else
                    alert(response.message);
                this.toggleModal();
            }
            else
                alert(response.message);
        }
        else {
            alert("Xin dien du thong tin");
        }
    }
    async handleDeleteCategory(id_cate)
    {
        const response = await deleteCategory(id_cate);
        if(response.success)
        {

            const newCategories = this.state.categories;
            let index = newCategories.find(x => x.id_category = id_cate);
            console.log(index);
            if(index !== -1)
            {
                alert("success");
                newCategories.splice(index, 1);
            }
            this.setState({categories: newCategories});
            this.setState({nameCategoryEdit:""})

        }
        else {
            console.log(response.message);
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

                const res= await getCategories();
                if(response.success)
                {
                    alert("success");
                    this.setState({categories:res.data.categories});
                }
                else
                    alert(response.message);
                this.toggleModalEdit();
            }
            else
            {
                alert(response.message)
            }
        }
        else {
            alert("Xin dien du thong tin")
        }
    }
    render() {

        return(
            <div className="container-category">
                <div className="btn">
                    <button className="add-new" onClick={this.toggleModal}>+ Thêm mới loại </button>
                    <Modal  show={this.state.isOpen}
                            onClose={this.toggleModal}
                            title="Thêm mới loại "
                            childrenContent={
                                <form>
                                    <div className="modal-group">
                                        <label>Loại: </label>
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
                </div>
                <div className="tbl-category">
                    <table>
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Loại</th>
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
                                        <td className="title-del"><img src={iconBin} alt="icon-bin" className="btn-delete" onClick={() => this.handleDeleteCategory(e.id_category)}/></td>
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