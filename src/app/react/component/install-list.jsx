
import React from 'react';
import PropTypes from 'prop-types';
import { updateInstallProgress, updateInstallToolsList } from '../../redux/action/index';
import { Pagination, Button, Icon, Tabs, Steps } from 'antd';
import ItemList from './item-list';

import '../style/install-list.scss';

const TabPane = Tabs.TabPane;
const Step = Steps.Step;

/**
 * (安装列表)
 * @export
 * @class installList
 * @extends Component
 */



class InstallList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            installPending: false
        };
    }

    enterLoading = () => {

        //模拟
        this.setState({
            installPending: true
        });
        this.props.updateProgressHandler(0);
    }

    componentWillReceiveProps(nextProps) {
        let { devData = [], data } = nextProps,
            { progressIndex: devProgressIndex = 0 } = data.dev;
        if (devProgressIndex === devData.length-1) {
            this.setState({
                installPending: false
            });
        }
    }

    render() {

        let { devData = [], data, updateListHandler, updateProgressHandler } = this.props,
            { dev, tools } = data,
            { progressIndex: devProgressIndex = 0 } = dev,
            { data: toolsData = [], page: toolsPage = {} } = tools,
            { pageNo = 1, pageSize = 10, totalRows = 0, totalPages = 0 } = toolsPage;

        let { installPending } = this.state;

        return (
            <div className="install-list">
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="apple" />开发环境安装</span>} key="1">
                        <div className="dev-wrap">
                            <Steps current={devProgressIndex}>
                                {devData.map(m => <Step key={m.title} title={m.title} />)}
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
                        {totalPages > 1 && <Pagination current={pageNo} pageSize={pageSize} total={totalRows} onChange={(pageNo, pageSize) => this.handleChange(pageNo, pageSize)} />}
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}

InstallList.propTypes = {
    data: PropTypes.object.isRequired,
    devData: PropTypes.array.isRequired,
    updateListHandler: PropTypes.func.isRequired,
    updateProgressHandler: PropTypes.func.isRequired
}

export default InstallList;