
import React from 'react';
import ReactDOM from 'react-dom';
import { ActionMenu } from './component/action-menu';

import './style/index.scss';
import './style/action-menu.scss';

import 'antd/dist/antd.css';


const actionMenus = {
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

/**
 * @class action-menu
 * @extends {Component}
 */

class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: props.actionMenus.selectedIndex
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
        return (
            <div className="app-container">
                <div className="action-menu-area">
                    <ActionMenu data={this.props.actionMenus.data} selectedIndex={this.state.selectedIndex} onClickHandler={this.handleActionMenuClick} />
                </div>
                <div className="main-content-area">
                </div>
                <div className="status-bar-area">
                </div>
                <div className="action-setting-area">
                </div>

            </div>
        )
    }
}
ReactDOM.render(
    <Container actionMenus={actionMenus} />,
    document.getElementById("root")
)