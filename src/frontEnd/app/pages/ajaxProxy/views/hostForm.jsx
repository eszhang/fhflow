import React from 'react';
import { Button, Icon, Input, Form, message } from 'antd';

const FormItem = Form.Item;

class HostFormCom extends React.Component {
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

    hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

    isPort = (rule, value, callback) => {
        if (value === '') {
            callback([new Error('please input your port')]);
        } else if (/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value)) {
            callback();
        } else {
            callback([new Error('please input right port')]);
        }
    }

    isIp = (rule, value, callback) => {
        if (value === '') {
            callback([new Error('please input your ip')]);
        } else if (/^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([0-9]|([0-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([0-9]|([0-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value) || value === 'localhost') {
            callback();
        } else {
            callback([new Error('please input right ip')]);
        }
    }

    render() {
        const { ip, port } = this.props;
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched
        } = this.props.form;
        const ipError = isFieldTouched('ip') && getFieldError('ip');
        const portError = isFieldTouched('port') && getFieldError('port');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem validateStatus={ipError ? 'error' : ''} help={ipError || ''} label="主机名">
                    {
                        getFieldDecorator('ip', {
                            initialValue: ip,
                            rules: [
                                { validator: this.isIp }
                            ]
                        })(<Input prefix={<Icon type="link" style={{ fontSize: 13 }} />} placeholder="ip" disabled />)
                    }
                </FormItem>
                <FormItem validateStatus={portError ? 'error' : ''} help={portError || ''} label="端口号">
                    {
                        getFieldDecorator('port', {
                            initialValue: port,
                            rules: [
                                { validator: this.isPort }
                            ]
                        })(<Input prefix={<Icon type="link" style={{ fontSize: 13 }} />} placeholder="port" />)
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError())} > 保存 </Button>
                </FormItem>
            </Form>
        );
    }
}

const HostForm = Form.create()(HostFormCom);

export default HostForm;
