import React from "react";
import "./style.css";
import moment from 'moment'
import CanvasJSReact from "../../../util/canvas/canvasjs.react";
import {getRevenues} from "../../../api/revenue-api";
import DatePickerCustom from "../../datepicker/datepicker";


const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const one_day = 24 * 60 * 60 * 1000;

class TotalRevenue extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        startDate: moment(Date.now() - 30 * one_day).format("YYYY/MM/DD"),
        endDate: moment(Date.now()).format("YYYY/MM/DD"),
        data: null
    };

    async componentDidMount() {
        let result = await getRevenues({
            startDate: this.state.startDate,
            endDate: this.state.endDate
        });
        result = result.data.revenues;
        let data = result.map(e => {
            return {
                label: e.create_time,
                y: parseInt(e.revenue)
            }
        });
        this.setState({
            data: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate){
            let result = await getRevenues({
                startDate: this.state.startDate,
                endDate: this.state.endDate
            });
            result = result.data.revenues;
            let data = result.map(e => {
                return {
                    label: e.create_time,
                    y: parseInt(e.revenue)
                }
            });
            this.setState({
                data: data
            })
        }
    }

    handleChange(e) {
        console.log(e);
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]: tex});
    };

    handleChangeDate = (date, column_state) => {
        const valueOfInput = moment(date).format("YYYY/MM/DD");
        console.log(column_state);
        this.setState({[column_state]: valueOfInput})
    };

    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2", "light2"
            title: {
                text: "Doanh thu nhà hàng theo ngày"
            },
            axisY: {
                //includeZero: true
            },
            axisX: {
                labelFormatter: function (e) {
                    return e.label;
                }
            },
            data: [{
                type: "line",
                dataPoints: this.state.data
            }]
        };
        return (
            <div className="container-total">
                <div className="btn">
                    <label>Từ: &nbsp;</label>
                    <DatePickerCustom startDate={this.state.startDate} handleChangeDate={this.handleChangeDate} name={"startDate"}/>
                    <label>Đến: &nbsp;</label>
                    <DatePickerCustom startDate={this.state.endDate} handleChangeDate={this.handleChangeDate} name={"endDate"}/>
                </div>
                <div className="body">
                    <CanvasJSChart options={options}/>
                </div>
            </div>);
    }
}

export default TotalRevenue;