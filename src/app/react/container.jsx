
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as action from '../redux/action/index';
import { ActionMenu } from './component/action-menu';
import { ProjectMask } from './component/project-mask';
import StatusBar  from './component/status-bar';
import ProxyList from './component/proxy-list';
import DigitalList from './component/digital-list';
import DocList from './component/doc-list';
import InstallList from './component/install-list';
import ProjectList from './component/project-list';
import ActionSetting from './component/action-setting';


import actionMenuData from '../redux/data/action-menu';
import proxyListData from '../redux/data/proxy-list';
import digitalListData from '../redux/data/digital-list';
import docListData from '../redux/data/doc-list';
import installListData from '../redux/data/install-list';
// import statusBarData from '../redux/data/status-bar';
import projectManageData from '../redux/data/project-list';
import actionSettingData from '../redux/data/action-setting';

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
    componentWillMount() {
        const { setProjectData, updateProjectSetting } = this.props;
        // setProjectData(projectManageData);
        // updateProjectSetting(actionSettingData);
        // setActionData(actionSettingData);

    }

    componentDidMount() {
        const { updateProxyHost, setProxyData, updateDocList, updateInstallToolsList } = this.props;
        // updateProxyHost(proxyListData.host);
        // setProxyData(proxyListData.data);
        updateDocList(docListData, 1, pageSize);
        updateInstallToolsList(installListData.tools, 1, pageSize)
    }

    handleActionMenuClick = index => {

        const { changeMenuSelected, changeGridLayout } = this.props;

        changeMenuSelected(index);
    }

    handleAddProject = () => {
        this.props.addProjectOrder();
    }

    handleActionProjectClick = index => {
        this.props.changeActionProject(index);
        this.props.changeProjectSetting();
    }

    submitProjectSettingHandler = (value) => {
        this.props.updateProjectSetting(value);
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

    handleDeleteStatusList = () => {
        this.props.updateStatusList([])
    }

    render() {

        const { actionMenuSelectedIndex, statusList, proxyList, docList, installList, updateProxyHost, addProxyItem, updateProxyItem, delProxyItem, up } = this.props;
        const { projectList, setProjectData, actionSetting, openProjectOrder, setWorkSpace, updateStatusList, delProjectOrder, addProjectOrder, changeActionProject, changeDevStatus, changeUploadStatus, changePackStatus } = this.props;
        const { EN, layoutType } = actionMenuData[actionMenuSelectedIndex];
        return (
            <div className="app-container" data-projects={projectList.data.length==0 && "noProject"} data-layout-type={layoutType}>
                {projectList.data.length==0 && (EN === "resource-management" || EN === "ajax-proxy") && <ProjectMask addProjectHandler={this.handleAddProject}/>}

                <div className="action-menu-area">
                    <ActionMenu data={actionMenuData} selectedIndex={actionMenuSelectedIndex} onClickHandler={this.handleActionMenuClick} />
                </div>
                <div className="main-content-area" data-type={EN}>
                    {EN === "resource-management" && <ProjectList setProjectData={setProjectData} data={projectList} setWorkSpace={setWorkSpace} delProjectHandler={delProjectOrder} openProjectHandler={openProjectOrder} changeDevStatusHandler={changeDevStatus} changeUploadStatusHandler={changeUploadStatus} updateStatusList={updateStatusList} changePackStatusHandler={changePackStatus} addProjectHandler={addProjectOrder} changeActionProject={changeActionProject} onClickHandler={this.handleActionProjectClick} />}
                    {EN === "ajax-proxy" && <ProxyList host={proxyList.host} data={proxyList.data} addProxyItemHandler={addProxyItem} updateProxyItemHandler={updateProxyItem} delProxyItemHandler={delProxyItem} updateHostHandler={updateProxyHost} />}
                    {EN === "digital-simulation" && <DigitalList data={digitalListData} />}
                    {EN === "environment-doc" && <DocList data={docList} updateHandler={this.handleUpdateToDocList} />}
                    {EN === "environment-install" && <InstallList devData={installListData.dev} data={installList} updateListHandler={this.handleUpdateToInstallList} updateProgressHandler={this.handleUpdateToInstallProgress} />}
                </div>
                <div className="status-bar-area">
                    <StatusBar data={statusList.data} deleteHandler={this.handleDeleteStatusList} />
                </div>
                <div className="action-setting-area">
                    <ActionSetting actionSetting={actionSetting.data} selectedIndex={actionSetting.selectedIndex} submitProjectSettingHandler={this.submitProjectSettingHandler} />
                </div>

            </div>
        )
    }
}

export default connect(state => state, action)(Container); 