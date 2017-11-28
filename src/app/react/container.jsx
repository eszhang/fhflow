
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
import digitalListData from '../redux/data/digital-list';
import docListData from '../redux/data/doc-list';
import installListData from '../redux/data/install-list';
import statusBarData from '../redux/data/status-bar';

import 'antd/dist/antd.css';

import './style/index.scss';
import './style/status-bar.scss';

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
        const { updateDocList, updateInstallToolsList } = this.props;
        updateDocList(docListData, 1, pageSize);
        updateInstallToolsList(installListData.tools, 1, pageSize)
    }

    handleActionMenuClick = index => {

        const { changeActionMenu, changeGridLayout } = this.props;

        changeActionMenu(index);
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
        const { actionMenuSelectedIndex, docList, installList } = this.props;
        const { EN, layoutType } = actionMenuData[actionMenuSelectedIndex];

        console.log(this.props);
        return (
            <div className="app-container" data-layout-type={layoutType}>
                <div className="action-menu-area">
                    <ActionMenu data={actionMenuData} selectedIndex={actionMenuSelectedIndex} onClickHandler={this.handleActionMenuClick} />
                </div>
                <div className="main-content-area">
                    {EN === "resource-management" && <ProjectList/>}
                    {EN === "ajax-proxy" && <ProxyList />}
                    {EN === "digital-simulation" && <DigitalList data={digitalListData} />}
                    {EN === "environment-doc" && <DocList data={docList} updateHandler={this.handleUpdateToDocList} />}
                    {EN === "environment-install" && <InstallList devData={installListData.dev} data={installList} updateListHandler={this.handleUpdateToInstallList} updateProgressHandler={this.handleUpdateToInstallProgress}/>}
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