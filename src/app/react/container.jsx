
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { changeGridLayout, changeActionMenu, updateDocList } from '../redux/action/index';
import { ActionMenu } from './component/action-menu';
import { StatusBar } from './component/status-bar';
import { DocList } from './component/doc-list';

import './style/index.scss';
import './style/action-menu.scss';
import './style/status-bar.scss';
import './style/doc-list.scss';

import 'antd/dist/antd.css';

const actionMenuData = [
    {
        CN: "资源管理器",
        EN: "resource-management",
        layoutType: 0
    }, {
        CN: "开发调试",
        EN: "environment-debugging",
        layoutType: 0
    }, {
        CN: "数据模拟",
        EN: "digital-simulation",
        layoutType: 0
    }, {
        CN: "文档",
        EN: "environment-doc",
        layoutType: 3
    }, {
        CN: "自定义任务流",
        EN: "expanding-task",
        layoutType: 0
    }, {
        CN: "开发环境安装",
        EN: "environment-install",
        layoutType: 0
    }
];

const docListData = [
    {
        title: "oasis",
        desc: "oasis API 开发文档",
        href: "#"
    }, {
        title: "oasisL-1.0",
        desc: "oasisL-1.0 API 开发文档",
        href: "#"
    }, {
        title: "oasisL-2.0",
        desc: "oasisL-2.0 API 开发文档",
        href: "#"
    }, {
        title: "rhyton",
        desc: "rhyton API 开发文档",
        href: "#"
    }, {
        title: "jquery",
        desc: "jquery API 开发文档",
        href: "#"
    }, {
        title: "lodash",
        desc: "lodash API 开发文档",
        href: "#"
    }, {
        title: "path",
        desc: "path API 开发文档",
        href: "#"
    }
];

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

    componentWillMount(){
       
    }

    handleActionMenuClick = index => {

        const { dispatch } = this.props;

        dispatch(changeGridLayout(actionMenuData[index].layoutType));
        dispatch(changeActionMenu(index));
    }

    render() {
        const { docList, statusBar, dispatch, actionMenuSelectedIndex, gridLayoutType } = this.props;
        console.log(this.props);
        return (
            <div className="app-container" data-layout-type={gridLayoutType}>
                <div className="action-menu-area">
                    <ActionMenu data={actionMenuData} selectedIndex={actionMenuSelectedIndex} onClickHandler={this.handleActionMenuClick} />
                </div>
                <div className="main-content-area">
                    {actionMenuData[actionMenuSelectedIndex].EN === "environment-doc" && <DocList data={docListData} />}
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

export default connect(state => state)(Container); 