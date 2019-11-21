import React from "react";
import "./style.css";
import moment from 'moment'
import CanvasJSReact from "../../../util/canvas/canvasjs.react";
import {getRevenues} from "../../../api/revenue-api";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const one_day = 24 * 60 * 60 * 1000;

class TotalRevenue extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        startDate: moment(Date.now() - 30 * one_day).format("YYYY-MM-DD"),
        endDate: moment(Date.now()).format("YYYY-MM-DD"),
        data: null
    };

    async componentDidMount() {
        let query = {
            startDate: this.state.startDate.split("-").join("/"),
            endDate: this.state.endDate.split("-").join("/")
        };
        let result = await getRevenues(query);
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

    handleChange(e) {
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]: tex});
    };

    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2", "light2"
            title: {
                text: "Doanh thu"
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
                    <label>Từ: </label>
                    <input type="date" onChange={this.handleChange} name="startDate" value={this.state.startDate}/>
                    <label>Đến: </label>
                    <input type="date" onChange={this.handleChange} name="endDate" value={this.state.endDate}/>
                </div>
                <div className="body">
                    <CanvasJSChart options={options}/>
                </div>
            </div>);
    }
}

export default TotalRevenue;