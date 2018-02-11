import React from 'react';
import { Icon, Input, Form, Modal } from 'antd';

const FormItem = Form.Item;

class ProxAddFormCom extends React.Component {
    isTarget = (rule, value, callback) => {
        if (value === '') {
            callback([new Error('please input your target')]);
        } else if (/^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*(\/[^\/]+)*\/?$/.test(value) || value === 'localhost') {
            callback();
        } else {
            callback([new Error('please input right target')]);
        }
    }


    render() {
        const {
            visible, onCancel, onCreate, form
        } = this.props;
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
        };
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
                    <FormItem {...formItemLayout} label="目标地址">
                        {
                            getFieldDecorator('target', {
                                rules: [{ validator: this.isTarget }]
                            })(<Input prefix={<Icon type="link" style={{ fontSize: 13 }} />} placeholder="target" />)
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const ProxAddForm = Form.create()(ProxAddFormCom);

export default ProxAddForm;
