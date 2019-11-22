import React from "react";
import "./style.css";
import moment from "moment";
import {statisticItems} from "../../../api/revenue-api";
import DatePicker from "react-datepicker";
const one_day = 24 * 60 * 60 * 1000;


class SalesByProducts extends React.Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    state = {
        startDate: moment(Date.now() - 30 * one_day).format("YYYY-MM-DD"),
        endDate: moment(Date.now()).format("YYYY-MM-DD"),
        items: null
    };

    handleChange(e){
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]:tex});
    };
    async componentDidMount() {
        let items = await statisticItems({
            startDate: this.state.startDate.split("-").join("/"),
            endDate: this.state.endDate.split("-").join("/")
        });
        this.setState({
            items: items.data.items
        })
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate){
            let query = {
                startDate: this.state.startDate.split("-").join("/"),
                endDate: this.state.endDate.split("-").join("/")
            };
            let result = await statisticItems(query);
            this.setState({
                items: result.data.items
            })
        }
    }

    handleChangeDate = (date, column_state) => {
        const valueOfInput = moment(date).format("YYYY/MM/DD");
        console.log(column_state);
        this.setState({[column_state]: valueOfInput})
    };

    render() {
        return( <div className="container-product">
            <div className="btn">
                <label>Từ: </label>
                {/*<input type="date" name="startDate" onChange={this.handleChange} value={this.state.startDate}/>*/}
                <DatePicker selected={moment(this.state.startDate).valueOf()} onChange={(value) => this.handleChangeDate(value, "startDate")}/>
                <label>Đến: </label>
                {/*<input type="date" name="endDate" onChange={this.handleChange} value={this.state.endDate}/>*/}
                <DatePicker selected={moment(this.state.endDate).valueOf()} onChange={(value) => this.handleChangeDate(value, "endDate")} />

            </div>
            <div className="tbl-product">
               <table>
                   <thead>
                    <tr>
                        <th>STT</th>
                        <th>Ảnh sản phẩm </th>
                        <th>Tên sản phẩm</th>
                        <th>Giá sản phẩm</th>
                        <th>Số lượt đặt</th>
                    </tr>
                   </thead>

                   <tbody>
                   {
                       (this.state.items || []).map((e, index) => {
                           return <tr key={index+1}>
                               <td>{index+1}</td>
                               <td><img src={e.image} alt="food" height={40} width={40}/></td>
                               <td>{e.name}</td>
                               <td>{e.price}</td>
                               <td>{e.order_count}</td>
                           </tr>
                       })
                   }
                   </tbody>
               </table>
            </div>
        </div>
        );
    }
}
export default SalesByProducts;