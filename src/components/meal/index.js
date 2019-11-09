import React, { Component } from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import "./style.css";
import 'react-web-tabs/dist/react-web-tabs.css';
import Category from "../category/category"
class Meal extends Component {
    render() {
        return (
            <div className="container-meal">
                <div className="title">
                    Quản lý danh sách món ăn
                </div>
                <Tabs
                    defaultTab="two"
                >
                    <TabList>
                        <div className="tab-item">
                            <Tab tabFor="one">Item</Tab>
                            <Tab tabFor="two">Category</Tab>
                        </div>
                    </TabList>
                    <TabPanel tabId="one">
                        <p>Tab 1 content</p>
                    </TabPanel>
                    <TabPanel tabId="two">
                        <Category/>
                    </TabPanel>
                </Tabs>
            </div>

        );
    }
}
export default Meal;