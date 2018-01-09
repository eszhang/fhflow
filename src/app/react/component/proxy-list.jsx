
import React from 'react';

import { Button, Icon, Table, Input, Popconfirm, Form, message, Modal } from 'antd';

import '../style/proxy-list.scss';

/**
 * （请求代理展示）
 * @export
 * @class ProxyList
 * @extends component
 */

const FormItem = Form.Item;
const confirm = Modal.confirm;

//host 表单
class IpPortForm extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        const { form, submitHandler } = this.props;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                submitHandler(values);
                message.success('访问主机名更新成功');
            }
        });
    }

    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    isPort = (rule, value, callback) => {
        if (value && (!/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value))) {
            callback([new Error('please input right port')]);
        } else {
            callback();
        }
    }

    render() {

        const { ip, port } = this.props;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const ipError = isFieldTouched('ip') && getFieldError('ip');
        const portError = isFieldTouched('port') && getFieldError('port');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem validateStatus={ipError ? 'error' : ''} help={ipError || ''} label="主机名">
                    {
                        getFieldDecorator('ip', {
                            initialValue: ip,
                            rules: [{ required: true, message: 'Please input your ip!' }]
                        })(<Input prefix={<Icon type="link" style={{ fontSize: 13 }} />} placeholder="ip" />)
                    }
                </FormItem>
                <FormItem validateStatus={portError ? 'error' : ''} help={portError || ''} label="端口号">
                    {
                        getFieldDecorator('port', {
                            initialValue: port,
                            rules: [
                                { required: true, message: 'Please input your port!' },
                                { validator: this.isPort }
                            ]
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
;

//proxyItem 表单
class ProxItemForm extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 }
            }
        }
        return (
            <Modal title="新增代理请求" visible={visible} onOk={onCreate} onCancel={onCancel}>
                <Form>
                    <FormItem {...formItemLayout} label="匹配规则">
                        {
                            getFieldDecorator('rule', {
                                rules: [{ required: true, message: 'Please input your rule!' }]
                            })(<Input prefix={<Icon type="link" style={{ fontSize: 13 }} />} placeholder="rule" />)
                        }
                    </FormItem>
                    <FormItem  {...formItemLayout} label="目标地址">
                        {
                            getFieldDecorator('target', {
                                rules: [{ required: true, message: 'Please input your target!' }]
                            })(<Input prefix={<Icon type="link" style={{ fontSize: 13 }} />} placeholder="target" />)
                        }
                    </FormItem>
                </Form>
            </Modal>
        )
    }

}
const WrappedProxItemForm = Form.create()(ProxItemForm);

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
            title: '匹配规则',
            dataIndex: 'rule',
            width: '40%',
            render: (text, record) => this.renderColumns(text, record, 'rule')
        }, {
            title: '目标地址',
            dataIndex: 'target',
            width: '40%',
            render: (text, record) => this.renderColumns(text, record, 'target')
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
                                    <Popconfirm title="确认取消 ?" onConfirm={() => this.cancel(record.key)}>
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

        this.cacheData = this.props.data.map(item => ({ ...item }));

        this.state = {
            modalVisible: false,
            newData: {}
        }

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
        const { updateProxyItemHandler } = this.props;
        const newData = [...this.state.newData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ newData: newData });
            // updateProxyItemHandler(newData);
        }
    }

    add() {
        this.setState({ modalVisible: true });
    }

    edit(key) {
        const { data, updateProxyItemHandler } = this.props;
        const newData = [...data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ newData: newData });
            updateProxyItemHandler(newData);
        }
    }

    delete(key) {
        let that = this;
        confirm({
            title: '您确认删除该条代理请求么？',
            onOk() {
                const { data, delProxyItemHandler } = that.props;
                const newData = [...data];
                const target = newData.filter(item => key === item.key)[0];
                if (target) {
                    delProxyItemHandler(key);
                    that.cacheData = newData.map(item => ({ ...item }));
                    message.success('删除成功');
                }
            }
        });

    }

    save(key) {
        const { updateProxyItemHandler } = this.props;
        const newData = [...this.state.newData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            updateProxyItemHandler(newData);
            this.cacheData = newData.map(item => ({ ...item }));
            this.setState({ newData: {} });
            message.success('更新成功');
        }
    }

    cancel(key) {
        const { data, updateProxyItemHandler } = this.props;
        const newData = [...this.props.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            updateProxyItemHandler({ newData });
            this.setState({ newData: {} });
        }
    }

    handleModalCreate() {
        const { addProxyItemHandler } = this.props;
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            form.resetFields();
            addProxyItemHandler(values);
            this.setState({ modalVisible: false });
            message.success('添加成功');
        });
    }

    handleModalCancel() {
        this.setState({ modalVisible: false });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
        const { host = {}, data = [], updateHostHandler } = this.props;
        const { ip, port } = host;
        const pagination = { pageSize: 10 }
        return (
            <div className="proxy-list">
                <div>
                    <WrappedIpPortForm ip={ip} port={port} submitHandler={updateHostHandler} />
                    <Button className="editable-add-btn" onClick={() => this.add()}>新增</Button>
                    <Table bordered size="small" dataSource={data} columns={this.columns} pagination={pagination} />
                    <WrappedProxItemForm ref={this.saveFormRef} visible={this.state.modalVisible} onCancel={() => this.handleModalCancel()} onCreate={() => this.handleModalCreate()} />
                </div>
            </div>
        )
    }
}