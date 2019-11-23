import React from 'react';
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";

class DatePickerCustom extends React.Component{
    render() {
        return(
            <DatePicker selected={moment(this.props.startDate).valueOf()} onChange={(value) => this.props.handleChangeDate(value, this.props.name)}/>
        )
    }
}

export default DatePickerCustom;