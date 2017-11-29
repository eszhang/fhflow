
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as action from '../redux/action/index';
import { ActionMenu } from './component/action-menu';
import { StatusBar } from './component/status-bar';
import ProxyList from './component/proxy-list';
import DigitalList from './component/digital-list';
import DocList from './component/doc-list';
import InstallList from './component/install-list';
import ProjectList from './component/project-list';


import actionMenuData from '../redux/data/action-menu';
import proxyListData from '../redux/data/proxy-list';
import digitalListData from '../redux/data/digital-list';
import docListData from '../redux/data/doc-list';
import installListData from '../redux/data/install-list';
import statusBarData from '../redux/data/status-bar';
import projectManageData from '../redux/data/project-list';

import 'antd/dist/antd.css';

import './style/index.scss';

const pageSize = 9;

/**
 * @class action-menu
 * @extends {Component}
 */

class Container extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { updateProxyHost, setProxyData, updateDocList, updateInstallToolsList } = this.props
        updateProxyHost(proxyListData.host);
        setProxyData(proxyListData.data);
        updateDocList(docListData, 1, pageSize);
        updateInstallToolsList(installListData.tools, 1, pageSize)
    }

    handleActionMenuClick = index => {

        const { changeActionMenu, changeGridLayout } = this.props;

        changeActionMenu(index);
    }

    handleActionProjectClick = index => {
        this.props.changeActionProject(index);
    }

    handleUpdateToDocList = (pageNo, pageSize) => {
        this.props.updateDocList(docListData, pageNo, pageSize);
    }

    handleUpdateToInstallList = (pageNo, pageSize) => {
        this.props.updateInstallToolsList(installListData.tools, pageNo, pageSize);
    }

    handleUpdateToInstallProgress = index => {
        this.props.updateInstallProgress(index);
    }

    render() {

        const { actionMenuSelectedIndex, proxyList, docList, installList, projectList, updateProxyHost, addProxyItem, updateProxyItem, deleteProxyItem } = this.props;
        const { EN, layoutType } = actionMenuData[actionMenuSelectedIndex];

        console.log(this.props);
        console.log(projectManageData);
        return (
            <div className="app-container" data-layout-type={layoutType}>
                <div className="action-menu-area">
                    <ActionMenu data={actionMenuData} selectedIndex={actionMenuSelectedIndex} onClickHandler={this.handleActionMenuClick} />
                </div>
                <div className="main-content-area">
                    {EN === "resource-management" && <ProjectList data={projectManageData} projectList={projectList} onClickHandler={this.handleActionProjectClick} />}
                    {EN === "ajax-proxy" && <ProxyList host={proxyList.host} data={proxyList.data} addProxyItemHandler={addProxyItem} updateProxyItemHandler={updateProxyItem} deleteProxyItemHandler={deleteProxyItem} updateHostHandler={updateProxyHost} />}

                    {EN === "digital-simulation" && <DigitalList data={digitalListData} />}
                    {EN === "environment-doc" && <DocList data={docList} updateHandler={this.handleUpdateToDocList} />}
                    {EN === "environment-install" && <InstallList devData={installListData.dev} data={installList} updateListHandler={this.handleUpdateToInstallList} updateProgressHandler={this.handleUpdateToInstallProgress} />}
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