import React, { Component } from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import "./style.css";
import 'react-web-tabs/dist/react-web-tabs.css';
import Category from "../category/category"
import Item from "../item/item";

class Meal extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            idPanel:"item",
            componentPanel:<Item/>
        }

    }
    handleTab = (id, component) =>
    {
        this.setState({idPanel: id, componentPanel: component});
    }
    render() {
        return (
            <div className="container-meal">
                <div className="title">
                    Quản lý danh sách món ăn
                </div>
                <Tabs defaultTab="item">
                    <TabList>
                        <div className="tab-item">
                            <Tab tabFor="item" onClick={() => this.handleTab("item",<Item/>)}>Sản phẩm </Tab>
                            <Tab tabFor="category" onClick={() => this.handleTab("category",<Category/>)}>Loại sản phẩm </Tab>
                        </div>
                    </TabList>
                    <TabPanel tabId={this.state.idPanel}>
                        {this.state.componentPanel}
                    </TabPanel>
                </Tabs>
            </div>

        );
    }
}
export default Meal;