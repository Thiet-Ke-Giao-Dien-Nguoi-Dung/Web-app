import React from "react";
import "./style.css";
import moment from "moment";
import {statisticItems} from "../../../api/revenue-api";
import DatePickerCustom from "../../datepicker/datepicker";
const one_day = 24 * 60 * 60 * 1000;

class SalesByProducts extends React.Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    state = {
        startDate: moment(Date.now() - 30 * one_day).format("YYYY/MM/DD"),
        endDate: moment(Date.now()).format("YYYY/MM/DD"),
        items: null
    };

    handleChange(e){
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]:tex});
    };
    async componentDidMount() {
        let items = await statisticItems({
            startDate: this.state.startDate,
            endDate: this.state.endDate
        });
        this.setState({
            items: items.data.items
        })
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate){
            let query = {
                startDate: this.state.startDate,
                endDate: this.state.endDate
            };
            let result = await statisticItems(query);
            this.setState({
                items: result.data.items
            })
        }
    }

    handleChangeDate = (date, column_state) => {
        const valueOfInput = moment(date).format("YYYY/MM/DD");
        this.setState({[column_state]: valueOfInput})
    };

    render() {
        return( <div className="container-product">
            <div className="btn">
                <label>Từ: &nbsp;</label>
                <DatePickerCustom startDate={this.state.startDate} handleChangeDate={this.handleChangeDate} name={"startDate"}/>
                <label>Đến: &nbsp;</label>
                <DatePickerCustom endDate={this.state.endDate} handleChangeDate={this.handleChangeDate} name={"endDate"}/>
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