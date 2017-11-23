
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { changeGridLayout, changeActionMenu, updateDocList, updateInstallToolsList } from '../redux/action/index';
import { ActionMenu } from './component/action-menu';
import { StatusBar } from './component/status-bar';
import DocList  from './container/doc-list';
// import { InstallList } from './component/install-list';

import actionMenuData from '../redux/data/actionMenu';
import installListData from '../redux/data/installList';

import './style/index.scss';
import './style/action-menu.scss';
import './style/status-bar.scss';
import './style/item-list.scss';
import './style/install-list.scss';

import 'antd/dist/antd.css';

const { dev: devData, tools: toolsListData } = installListData;

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

const docPageSize = 9;
/**
 * @class action-menu
 * @extends {Component}
 */

class Container extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

        const { dispatch } = this.props;

        let toolsIndex = 1,
            toolsData = toolsListData.slice(0, docPageSize);

        dispatch(updateInstallToolsList(toolsIndex, toolsData));
    }

    handleActionMenuClick = index => {

        const { dispatch } = this.props;
        dispatch(changeGridLayout(actionMenuData[index].layoutType));
        dispatch(changeActionMenu(index));
    }


    handleToolsPageChange = (page, pageSize) => {

        let index = page,
            data = toolsListData.slice((index - 1) * pageSize, index * pageSize);
        const { dispatch } = this.props;
        dispatch(updateInstallToolsList(index, data));
    }

    render() {
        const { dispatch, actionMenuSelectedIndex, gridLayoutType, docList, installList, statusBar } = this.props;
        console.log(this.props);
        return (
            <div className="app-container" data-layout-type={gridLayoutType}>
                <div className="action-menu-area">
                    <ActionMenu data={actionMenuData} selectedIndex={actionMenuSelectedIndex} onClickHandler={this.handleActionMenuClick} />
                </div>
                <div className="main-content-area">
                    {actionMenuData[actionMenuSelectedIndex].EN === "environment-doc" && <DocList />}
                    {/* {actionMenuData[actionMenuSelectedIndex].EN === "environment-install" && <InstallList data={installList.tools.data} currentIndex={installList.tools.index} pageSize={docPageSize} total={toolsListData.length} onChangeHandler={this.handleToolsPageChange} />} */}
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