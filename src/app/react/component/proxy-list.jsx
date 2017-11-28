
import React from 'react';

import { Button, Icon, Table, Input, Popconfirm } from 'antd';

import '../style/proxy-list.scss';

/**
 * （请求代理展示）
 * @export
 * @class ProxyList
 * @extends component
 */

const data = [];

export default class ProxyList extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: '主机名',
            dataIndex: 'ip',
            width: '30%',
        }, {
            title: '端口号',
            dataIndex: 'port',
            width: '15%',
        }, {
            title: '项目名',
            dataIndex: 'project',
            width: '30%',
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: '30%',
            render: (text, record) => {
                const { editable } = record;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                                    <a onClick={() => this.save(record.key)}>保存</a>
                                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>
                                : <a onClick={() => this.edit(record.key)}>编辑</a>
                        }
                    </div>
                );
            },
        }];

        this.state = { data };

    }

    edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }

    save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.setState({ data: newData });
            this.cacheData = newData.map(item => ({ ...item }));
        }
    }
    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }

    render() {

        const { title, contents, href } = this.props;

        const data = [];

        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                ip: `172.16.10.${i}`,
                port: i,
                project: `London-${i}`,
            });
        }

        return (

            <div className="proxy-list">
                <Button className="editable-add-btn" onClick={this.handleAdd}>新增</Button>
                <Table bordered dataSource={data} columns={this.columns} />
            </div>
        )
    }
}