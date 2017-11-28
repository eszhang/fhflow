
import React from 'react';

import { Button, Icon, Table, Input, Popconfirm, Form } from 'antd';

import '../style/proxy-list.scss';

/**
 * （请求代理展示）
 * @export
 * @class ProxyList
 * @extends component
 */

const FormItem = Form.Item;

const data = [];

for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        ip: `172.16.10.${i}`,
        port: i,
        project: `London-${i}`,
    });
}

class IpPortForm extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        const { form, updateHander } = this.props;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                updateHander(values)
            }
        });
    }

    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    render() {

        const { ip, port } = this.props;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const ipError = isFieldTouched('ip') && getFieldError('ip');
        const portError = isFieldTouched('port') && getFieldError('port');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem validateStatus={ipError ? 'error' : ''} help={ipError || ''}>
                    {
                        getFieldDecorator('ip', {
                            initialValue: ip,
                            rules: [{ required: true, message: 'Please input your ip!' }]
                        })(<Input prefix={<Icon type="link" style={{ fontSize: 13 }} />} placeholder="ip" />)
                    }
                </FormItem>
                <FormItem validateStatus={portError ? 'error' : ''} help={portError || ''} >
                    {
                        getFieldDecorator('port', {
                            initialValue: port,
                            rules: [{ required: true, message: 'Please input your port!' }]
                        })(<Input prefix={<Icon type="link" style={{ fontSize: 13 }} />} placeholder="port" />)
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError())} > 保存 </Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedIpPortForm = Form.create()(IpPortForm);

const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);

export default class ProxyList extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: '主机名',
            dataIndex: 'ip',
            width: '35%',
            render: (text, record) => this.renderColumns(text, record, 'ip')
        }, {
            title: '端口号',
            dataIndex: 'port',
            width: '15%',
            render: (text, record) => this.renderColumns(text, record, 'port')
        }, {
            title: '项目名',
            dataIndex: 'project',
            width: '35%',
            render: (text, record) => this.renderColumns(text, record, 'project')
        }, {
            title: '操作',
            dataIndex: 'operation',
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
                        <a onClick={() => this.delete(record.key)}>删除</a>
                    </div>
                );
            },
        }];

        this.state = { data };
        this.cacheData = data.map(item => ({ ...item }));

    }

    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }

    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }

    add() {

    }

    edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }

    delete(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            this.setState({ data: newData.filter(item => item.key !== key) });
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
        const { host = {}, updateHostHandler } = this.props;
        const { ip, port } = host;
        return (
            <div className="proxy-list">
                <WrappedIpPortForm ip={ip} port={port} updateHander={updateHostHandler} />
                <Button className="editable-add-btn" onClick={this.handleAdd}>新增</Button>
                <Table bordered dataSource={this.state.data} columns={this.columns} />
            </div>
        )
    }
}