import React from 'react';
import { Form, Input, Icon, Button, Checkbox, Radio } from 'antd';
import '../style/action-setting.scss';
const FormItem = Form.Item;
const CheckboxGroup  = Checkbox.Group;
const RadioGroup  = Radio.Group;

class ActionSettingForm extends React.Component{
    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
        // const { form, submitHandler } = this.props;
        // e.preventDefault();
        // form.validateFields((err, values) => {
        //     if (!err) {
        //         submitHandler(values);
        //         message.success('访问主机名更新成功');
        //     }
        // });
    }

    render(){
        const functionOptions = [
            { label: '开启LiveReload浏览器自动刷新', value: 'liveReload' },
            { label: '开启REM适配解决方案', value: 'rem' },
            { label: '开启文件版本(MD5)去缓存解决方案', value: 'md5' },
            { label: '开启文件变动增量编译支持', value: 'fileAddCompileSupport' },
        ];
        const radioValue = 1;
        const packageValue = 1;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem label="工作区路径">
                    <Input placeholder="工作区路径" size="small" />
                </FormItem>
                <FormItem label="功能">
                    <CheckboxGroup className="functionGroup" options={functionOptions} defaultValue={['Apple']}  />
                </FormItem>
                <FormItem label="上传模式配置">
                    <Input placeholder="服务器地址" size="small" />
                    <Input placeholder="用户名" size="small" />
                    <Input placeholder="密码" size="small" />
                    <Input placeholder="端口" size="small" />
                    <Input placeholder="远程路径" size="small" />
                    <Input placeholder="过滤上传文件(支持正则匹配)" size="small" />
                    <RadioGroup value={radioValue}>
                        <Radio value={1}>FTP</Radio>
                        <Radio value={2}>SFTP</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="打包">
                    <Input placeholder="打包名称" size="small" />
                    <Input placeholder="版本号" size="small" />
                    <Input placeholder="自定义命名规则" size="small" />
                    <RadioGroup value={packageValue}>
                        <Radio value={1}>rar</Radio>
                        <Radio value={2}>zip</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        )
    }
}

const WrappedActionSettingForm = Form.create()(ActionSettingForm);

export default class ActionSetting extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render(){
        return (
            <div className="action-setting">
                <WrappedActionSettingForm />
            </div>
        )
    }
}