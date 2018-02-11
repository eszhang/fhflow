import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Table, Input, Popconfirm, message, Modal } from 'antd';
import HostForm from './hostForm';
import ProxyAddForm from './proxyAddForm';
import {
    setProxyHost,
    addProxyItem,
    updateProxyItem,
    delProxyItem,
    setProxyData
} from '../actions';
import './style.scss';

/**
 * （请求代理展示）
 * @export
 * @class ProxyList
 * @extends component
 */

const confirm = Modal.confirm;

const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);

class ProxyList extends React.Component {
    propTypes = {
        host: PropTypes.object.isRequired,
        data: PropTypes.arrayOf(PropTypes.object.isRequired)
    }

    defaultProps = {
        host: {},
        data: []
    }

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
            }
        }];

        this.cacheData = this.props.data.map(item => ({ ...item }));
        this.state = {
            modalVisible: false
        };
    }

    handleChange(value, key, column) {
        const { data, updateProxyItemHandler } = this.props;
        const newData = [...data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            updateProxyItemHandler(newData);
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
            updateProxyItemHandler(newData);
        }
    }

    delete(key) {
        const that = this;
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
        const { data, updateProxyItemHandler } = this.props;
        const newData = [...data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            updateProxyItemHandler(newData);
            this.cacheData = newData.map(item => ({ ...item }));
            message.success('更新成功');
        }
    }

    cancel(key) {
        const { updateProxyItemHandler } = this.props;
        const newData = [...this.props.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            updateProxyItemHandler({ newData });
        }
    }

    handleModalCreate() {
        const { addProxyItemHandler } = this.props;
        const form = this.form;
        const uniqueID = Date.now();
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            form.resetFields();
            const proxyItem = {
                id: uniqueID,
                key: uniqueID,
                ...values
            };
            addProxyItemHandler(proxyItem);
            this.cacheData = [{ ...proxyItem }, ...this.cacheData];
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

    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }

    render() {
        const { host = {}, data = [], updateHostHandler } = this.props;
        const { ip, port } = host;
        const pagination = { pageSize: 10 };
        return (
            <div className="proxy-list">
                <div>
                    <HostForm ip={ip} port={port} submitHandler={updateHostHandler} />
                    <Button className="editable-add-btn" onClick={() => this.add()}>新增</Button>
                    <Table bordered size="small" dataSource={data} columns={this.columns} pagination={pagination} />
                    <ProxyAddForm ref={this.saveFormRef} visible={this.state.modalVisible} onCancel={() => this.handleModalCancel()} onCreate={() => this.handleModalCreate()} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        host: state.proxyList.host,
        data: state.proxyList.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setProxyHostHandler: bindActionCreators(setProxyHost, dispatch),
        addProxyItemHandler: bindActionCreators(addProxyItem, dispatch),
        updateProxyItemHandler: bindActionCreators(updateProxyItem, dispatch),
        delProxyItemHandler: bindActionCreators(delProxyItem, dispatch),
        setProxyDataHandler: bindActionCreators(setProxyData, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProxyList);
