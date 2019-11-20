import React from 'react';
import "./style.css";
import {Tab, TabList, TabPanel, Tabs} from "react-web-tabs";

import SalesByProducts from "../salesByProducts/salesByProducts";
import TotalRevenue from "../totalRevenue/totalRevenue"

class Revenue extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            idPanel:"one",
            componentPanel:<TotalRevenue/>
        }

    }
    handleTab = (id, component) =>
    {
        this.setState({idPanel: id, componentPanel: component});
    }
    render() {
        return(
            <div className="container-revenue">
                <div className="title">
                    Quản lý doanh thu
                </div>
                <Tabs defaultTab="one">
                    <TabList>
                        <div className="tab-item">
                            <Tab tabFor="one" onClick={() => this.handleTab("one",<TotalRevenue/>)}>Tổng doanh thu </Tab>
                            <Tab tabFor="two" onClick={() => this.handleTab("two",<SalesByProducts/>)}>Doanh thu từng sản phẩm </Tab>
                        </div>
                    </TabList>
                    <TabPanel tabId={this.state.idPanel}>
                        {this.state.componentPanel}
                    </TabPanel>
                </Tabs>
            </div>);
    }
}
export default Revenue;