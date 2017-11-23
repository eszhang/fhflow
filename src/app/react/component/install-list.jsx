
import React from 'react';
import { connect } from 'react-redux';
import { Pagination, Button, Icon, Tabs, Steps } from 'antd';
import { ItemList } from './item-list';

import { InstallList } from './component/install-list';
/**
 * @function installList
 */

const TabPane = Tabs.TabPane;
const Step = Steps.Step;
const { dev: devData, tools: toolsListData } = installListData;

function InstallList(props) {

    const { data } = props;
    return (
        <div className="install-list">
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="apple" />开发环境安装</span>} key="1">
                    <div className="dev-wrap">
                        <Steps current={0}>
                            {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div className="opt-area">
                            <Button type="primary" loading={true} size="large">
                                INSTALL
                            </Button>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="android" />常用开发工具下载</span>} key="2">
                    <ItemList data={data} extraText="下载" />
                </TabPane>
            </Tabs>

        </div>
    )
}

export default connect(state => state)(InstallList); 