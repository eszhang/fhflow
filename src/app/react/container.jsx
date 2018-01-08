
import React from 'react';
import { connect } from 'react-redux';
import * as action from '../redux/action/index';
import { ActionMenu } from './component/action-menu';
import { ProjectMask } from './component/project-mask';
import StatusBar from './component/status-bar';
import ProxyList from './component/proxy-list';
import DigitalList from './component/digital-list';
import DocList from './component/doc-list';
import InstallList from './component/install-list';
import ProjectList from './component/project-list';
import ActionSetting from './component/action-setting';

import actionMenuData from '../redux/data/action-menu';
import digitalListData from '../redux/data/digital-list';
import docListData from '../redux/data/doc-list';
import installListData from '../redux/data/install-list';

import 'antd/dist/antd.css';

import './style/index.scss';
import './iconfont/iconfont.css';

const defaultPageSize = 9;

/**
 * @class action-menu
 * @extends {Component}
 */

class Container extends React.Component {
    static propTypes = {}
    componentDidMount() {
        this.props.updateDocList(docListData, 1, defaultPageSize);
        this.props.updateInstallToolsList(installListData.tools, 1, defaultPageSize);
    }

    handleActionMenuClick = (index) => {
        this.props.changeMenuSelected(index);
    }

    handleAddProject = () => {
        this.props.addProjectOrder();
    }

    handleActionProjectClick = (index) => {
        this.props.changeActionProject(index);
        this.props.changeProjectSetting();
    }

    submitProjectSettingHandler = (value) => {
        this.props.updateProjectSetting(value);
    }

    handleUpdateToDocList = (pageNo, pageSize) => {
        this.props.updateDocList(docListData, pageNo, pageSize);
    }

    handleDocClick = (link) => {
        this.props.openLink(link);
    }

    handleUpdateToInstallList = (pageNo, pageSize) => {
        this.props.updateInstallToolsList(installListData.tools, pageNo, pageSize);
    }

    handleUpdateToInstallProgress = (index) => {
        this.props.updateInstallProgress(index);
    }

    handleDeleteStatusList = () => {
        this.props.updateStatusList([]);
    }

    render() {
        const {
            actionMenuSelectedIndex,
            setWorkSpace,
            projectList, changeActionProject, setProjectData, openProjectOrder, addProjectOrder, delProjectOrder, updateProjectName,
            changeDevStatus, changeUploadStatus, changePackStatus, changeRunStatus,
            actionSetting,
            statusList, updateStatusList,
            proxyList, updateProxyHost, addProxyItem, updateProxyItem, delProxyItem,
            docList,
            installList,
            importModules, delModules
        } = this.props;

        const { EN, layoutType } = actionMenuData[actionMenuSelectedIndex];

        let MainView;

        switch (EN) {
            case 'resource-management':
                MainView = (
                    <ProjectList
                        setProjectData={setProjectData}
                        data={projectList}
                        setWorkSpace={setWorkSpace}
                        delProjectHandler={delProjectOrder}
                        openProjectHandler={openProjectOrder}
                        changeDevStatusHandler={changeDevStatus}
                        changeUploadStatusHandler={changeUploadStatus}
                        updateStatusList={updateStatusList}
                        changePackStatusHandler={changePackStatus}
                        addProjectHandler={addProjectOrder}
                        changeActionProject={changeActionProject}
                        changeRunStatusHandler={changeRunStatus}
                        onClickHandler={this.handleActionProjectClick}
                        updateProjectName={updateProjectName}
                    />
                );
                break;
            case 'ajax-proxy':
                MainView = <ProxyList host={proxyList.host} data={proxyList.data} addProxyItemHandler={addProxyItem} updateProxyItemHandler={updateProxyItem} delProxyItemHandler={delProxyItem} updateHostHandler={updateProxyHost} />;
                break;
            case 'digital-simulation':
                MainView = <DigitalList data={digitalListData} onClickHandler={this.handleDocClick} />;
                break;
            case 'environment-doc':
                MainView = <DocList data={docList} updateHandler={this.handleUpdateToDocList} onClickHandler={this.handleDocClick} />;
                break;
            case 'environment-install':
                MainView = <InstallList devData={installListData.dev} data={installList} updateListHandler={this.handleUpdateToInstallList} updateProgressHandler={this.handleUpdateToInstallProgress} onClickHandler={this.handleDocClick} />;
                break;
            default:
                break;
        }

        return (
            <div className="app-container" data-layout-type={layoutType}>
                {
                    projectList.data.length === 0 && (EN === 'resource-management' || EN === 'ajax-proxy')
                    && <ProjectMask addProjectHandler={this.handleAddProject} />
                }
                <div className="action-menu-area">
                    <ActionMenu data={actionMenuData} selectedIndex={actionMenuSelectedIndex} onClickHandler={this.handleActionMenuClick} />
                </div>
                <div className="main-content-area" data-type={EN}>
                    {MainView}
                </div>
                <div className="status-bar-area">
                    <StatusBar data={statusList.data} deleteHandler={this.handleDeleteStatusList} />
                </div>
                <div className="action-setting-area">
                    <ActionSetting actionSetting={actionSetting.data} importModulesHandler={importModules} delModulesHandler={delModules} selectedIndex={actionSetting.selectedIndex} submitProjectSettingHandler={this.submitProjectSettingHandler} />
                </div>
            </div>
        );
    }
}

export default connect(state => state, action)(Container);
