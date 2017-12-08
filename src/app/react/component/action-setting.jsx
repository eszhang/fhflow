import React from 'react';
import { Form, Input, Icon, Button, Checkbox, Radio, Tabs } from 'antd';
import '../style/action-setting.scss';
const FormItem = Form.Item;
const CheckboxGroup  = Checkbox.Group;
const RadioGroup  = Radio.Group;
const InputGroup  = Input.Group;
const TabPane = Tabs.TabPane;

class ActionSettingForm extends React.Component{
    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
         e.preventDefault();
        alert(111)
        // const { form, submitHandler } = this.props;
        // e.preventDefault();
        // form.validateFields((err, values) => {
        //     if (!err) {
        //         submitHandler(values);
        //         message.success('访问主机名更新成功');
        //     }
        // });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }
    render(){
        const { actionSetting, selectedIndex } = this.props;
        
        const functionOptions = [
            { label: '开启LiveReload浏览器自动刷新', value: 'liveReload' },
            { label: '开启REM适配解决方案', value: 'rem' },
            { label: '开启文件版本(MD5)去缓存解决方案', value: 'md5' },
            { label: '开启文件变动增量编译支持', value: 'fileAddCompileSupport' },
        ];
        const radioValue = 1;
        const packageValue = 1;
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem label="工作区路径">
                    <Input readOnly placeholder="工作区路径" size="small"/>
                </FormItem>
                <FormItem label="功能">
                    <CheckboxGroup className="functionGroup" options={functionOptions} defaultValue={['liveReload']}  />
                </FormItem>
                <div className="modulName">上传模式配置</div>
                <InputGroup size="small" >
                    <FormItem >
                        {getFieldDecorator('ip', {
                            rules: [ {
                            required: true, message: 'Please input your E-mail!',
                            },{
                                validator(rule,values,callback){
                                    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                                    if(!reg.test(values)){
                                        callback('请输入正确的ip地址');
                                    }else{
                                        callback();
                                    }
                                    
                                }
                            }],
                        })(
                        <Input placeholder="服务器地址" size="small" />
                        )}
                    </FormItem>
                    <FormItem >
                        <Input placeholder="用户名" size="small" />
                    </FormItem>
                    <FormItem >
                        <Input placeholder="密码" type="password" size="small" />
                    </FormItem>
                    <FormItem >
                        <Input placeholder="端口" size="small" />
                    </FormItem>
                    <FormItem >
                        <Input placeholder="远程路径" size="small" />
                    </FormItem>
                    <FormItem >
                        <Input placeholder="过滤上传文件(支持正则匹配)" size="small" />
                    </FormItem>

                </InputGroup>
                <RadioGroup value={radioValue}>
                    <Radio value={1}>FTP</Radio>
                    <Radio value={2}>SFTP</Radio>
                </RadioGroup>
                <FormItem label="打包">
                    <Input placeholder="打包名称" size="small" />
                    <Input placeholder="版本号" size="small" />
                    <Input placeholder="自定义命名规则" size="small" />
                    <RadioGroup value={packageValue}>
                        <Radio value={1}>rar</Radio>
                        <Radio value={2}>zip</Radio>
                    </RadioGroup>
                </FormItem>
                 <FormItem > 
                    <Button type="primary" htmlType="submit">保存</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    Clear
                    </Button>
                 </FormItem> 
            </Form>
        )
    }
}

class SeniorDevelopSetting extends React.Component{
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
            { label: '模块一', value: 'module1' },
            { label: '模块二', value: 'module2' },
            { label: '模块三', value: 'module3' },
            { label: '模块四', value: 'module4' },
            { label: '模块五', value: 'module5' },
        ];
        
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem label="模块设置">
                    <CheckboxGroup options={functionOptions} defaultValue={['module1','module2','module3','module4','module5']}  />
                </FormItem>
            </Form>
        )
    }
}



const WrappedActionSettingForm = Form.create()(ActionSettingForm);
const WrappedSeniorDevelopSettingForm = Form.create()(SeniorDevelopSetting);

export default class ActionSetting extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render(){
        const { actionSetting, selectedIndex } = this.props;
        return (
            <div className="action-setting">
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="apple" />项目设置</span>} key="1">
                        <WrappedActionSettingForm  data={actionSetting} selectedIndex={selectedIndex}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />开发设置</span>} key="2">
                        <WrappedSeniorDevelopSettingForm data={actionSetting} selectedIndex={selectedIndex}/>
                    </TabPane>
                </Tabs>
                
            </div>
        )
    }
}