
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as action from '../redux/action/index';
import { ActionMenu } from './component/action-menu';
import { StatusBar } from './component/status-bar';
import DocList from './component/doc-list';
import InstallList from './component/install-list';

import actionMenuData from '../redux/data/action-menu';

import 'antd/dist/antd.css';

import './style/index.scss';
import './style/action-menu.scss';
import './style/status-bar.scss';
import './style/item-list.scss';





const statusBarData = [
    {
        desc: "dev任务开发编译，这是一条描述信息",
        type: ""
    }, {
        desc: "dev任务已成功编译，这是一条成功描述信息",
        type: "success"
    }, {
        desc: "dev任务已成功编译，这是一条成功描述信息",
        type: "success"
    }, {
        desc: "这是一条通知描述信息",
        type: "info"
    }, {
        desc: "这是一条成功描述信息",
        type: "success"
    }, {
        desc: "这是一条错误描述信息",
        type: "error"
    }, {
        desc: "这是一条警告描述信息",
        type: "warning"
    }
]

/**
 * @class action-menu
 * @extends {Component}
 */

class Container extends React.Component {

    constructor(props) {
        super(props);

    }

    handleActionMenuClick = index => {

        const { changeActionMenu, changeGridLayout } = this.props;
        changeGridLayout(actionMenuData[index].layoutType);
        changeActionMenu(index);
    }

    render() {
        const { actionMenuSelectedIndex, gridLayoutType } = this.props;
        console.log(this.props);
        return (
            <div className="app-container" data-layout-type={gridLayoutType}>
                <div className="action-menu-area">
                    <ActionMenu data={actionMenuData} selectedIndex={actionMenuSelectedIndex} onClickHandler={this.handleActionMenuClick} />
                </div>
                <div className="main-content-area">
                    {actionMenuData[actionMenuSelectedIndex].EN === "environment-doc" && <DocList />}
                    {actionMenuData[actionMenuSelectedIndex].EN === "environment-install" && <InstallList />}
                </div>
                <div className="status-bar-area">
                    <div>
                        <StatusBar data={statusBarData} />
                    </div>
                </div>
                <div className="action-setting-area">
                </div>

            </div>
        )
    }
}

export default connect(state => state, action)(Container); 