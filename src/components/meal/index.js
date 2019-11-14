import React, { Component } from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import "./style.css";
import 'react-web-tabs/dist/react-web-tabs.css';
import Category from "../category/category"
import Item from "../item/item";

class Meal extends Component {

    render() {

        return (
            <div className="container-meal">
                <div className="title">
                    Quản lý danh sách món ăn
                </div>
                <Tabs defaultTab="one">
                    <TabList>
                        <div className="tab-item">
                            <Tab tabFor="one">Category</Tab>
                            <Tab tabFor="two">Item</Tab>
                        </div>
                    </TabList>
                    <TabPanel tabId="one">
                        <Category/>
                    </TabPanel>
                    <TabPanel tabId="two">
                        <Item/>
                    </TabPanel>
                </Tabs>
            </div>

        );
    }
}
export default Meal;