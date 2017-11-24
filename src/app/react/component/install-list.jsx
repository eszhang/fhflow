
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateInstallProgress, updateInstallToolsList } from '../../redux/action/index';

import { Pagination, Button, Icon, Tabs, Steps } from 'antd';
import ItemList from './item-list';

import installListData from '../../redux/data/install-list';

import '../style/install-list.scss';

/**
 * (安装列表)
 * @export
 * @function installList
 * @extends Component
 */

const TabPane = Tabs.TabPane;
const Step = Steps.Step;
const { dev: devListData, tools: toolsListData } = installListData;
const pageSize = 9;

class InstallList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            installProgressIndex: 0,
            installPending: false                    
        }
    }

    componentDidMount() {
        this.props.updateInstallToolsList(toolsListData, 1, pageSize);
    }

    enterLoading = () => {
        this.setState({ 
            installProgressIndex: 0,
            installPending: true 
        });

        //模拟

        let trggerInstall = (index,delay) => {
            setTimeout(() => {
                this.setState({ 

                    installProgressIndex: index 
                    
                });
            },delay)
        };
       
        trggerInstall(1,1500);
        trggerInstall(2,2500);
        trggerInstall(3,3500);
        trggerInstall(4,4500);

        setTimeout(() => {
            this.setState({ 
                installPending: false 
                
            });
            console.log(this.state)
        },5500)
    }

    handleChange(pageNo, pageSize) {
        this.props.updateInstallToolsList(toolsListData, pageNo, pageSize);
    }

    render(){
        let { installList, updateInstallProgress, updateInstallToolsList } = this.props, 
            { dev, tools } = installList,
            { data: devData = devListData, progressIndex: devProgressIndex =0} = dev,
            { data: toolsData = [], page: toolsPage = {}} = tools,
            { pageNo = 1, pageSize = 10, totalRows = 0 } = toolsPage;

        let { installProgressIndex, installPending } = this.state;

        let installSteps = [{title: "START"}, ...devData, {title: "FINISH"}];

        return (
            <div className="install-list">
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="apple" />开发环境安装</span>} key="1">
                        <div className="dev-wrap">
                            <Steps current={installProgressIndex}>
                                {installSteps.map(item => <Step key={item.title} title={item.title} />)}
                            </Steps>
                            <div className="opt-area">
                                <Button type="primary" size="large" loading={installPending} onClick={this.enterLoading}>
                                    INSTALL
                                </Button>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />常用开发工具下载</span>} key="2">
                        <ItemList data={toolsData} extraText="下载" />
                        <Pagination current={pageNo} pageSize={pageSize} total={totalRows} onChange={(page, pageSize) => this.handleChange(page, pageSize)} />
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}

export default connect(state => ({
    installList: state.installList
}), dispatch => ({
    updateInstallProgress: bindActionCreators(updateInstallProgress, dispatch),
    updateInstallToolsList: bindActionCreators(updateInstallToolsList, dispatch)
}))(InstallList); 