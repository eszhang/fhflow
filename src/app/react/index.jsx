
import React from 'react';
import ReactDOM from 'react-dom';
import { ActionMenu } from './component/action-menu';
import { StatusBar } from './component/status-bar';
import { DocList } from './component/doc-list';

import './style/index.scss';
import './style/action-menu.scss';
import './style/status-bar.scss';
import './style/doc-list.scss';

import 'antd/dist/antd.css';

//这里先模拟管理数据部分，后面用redux来管理
const actionMenu = {
    data: [{
        CN: "资源管理器",
        EN: "resource-management"
    }, {
        CN: "开发调试",
        EN: "environment-debugging"
    }, {
        CN: "数据模拟",
        EN: "digital-simulation"
    }, {
        CN: "文档",
        EN: "environment-doc"
    }, {
        CN: "自定义任务流",
        EN: "expanding-task"
    }, {
        CN: "开发环境安装",
        EN: "environment-install"
    }],
    selectedIndex: 0
};

const docList = [
    {
        title: "jquery",
        desc: "jquery API 开发文档",
        href: "#"
    }, {
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
        title: "lodash",
        desc: "lodash API 开发文档",
        href: "#"
    }, {
        title: "path",
        desc: "path API 开发文档",
        href: "#"
    }
];

const statusBar = [
    {
        desc: "dev任务开发编译，这是一条描述信息",
        type: ""
    },
    {
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
        this.state = {
            selectedIndex: props.actionMenu.selectedIndex
        }
    }

    handleActionMenuClick = (index, e) => {
        console.log(index, e.target)
        this.setState({
            //actionMenu active下标
            selectedIndex: index
        })
    }

    render() {
        const { actionMenu, docList, statusBar } = this.props;
        return (
            <div className="app-container">
                <div className="action-menu-area">
                    <ActionMenu data={actionMenu.data} selectedIndex={this.state.selectedIndex} onClickHandler={this.handleActionMenuClick} />
                </div>
                <div className="main-content-area">
                    <DocList data={docList} />
                </div>
                <div className="status-bar-area">
                    <div>
                        <StatusBar data={statusBar} />
                    </div>
                </div>
                <div className="action-setting-area">
                </div>

            </div>
        )
    }
}
ReactDOM.render(
    <Container actionMenu={actionMenu} docList={docList} statusBar={statusBar} />,
    document.getElementById("root")
)