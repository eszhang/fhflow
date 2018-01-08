import React from 'react';
import { Form, Input, Icon, Button, Checkbox, Radio, message, Tabs } from 'antd';
import '../style/action-setting.scss';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;
const TabPane = Tabs.TabPane;

class ActionSettingForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { submitHandler } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                submitHandler(values);
                message.success('项目配置更新成功');
            }
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const { actionSetting, selectedIndex } = this.props;
        const {
            choseFunctions, workSpace, uploadHost, uploadPort,
            uploadUser, uploadPass, uploadRemotePath, uploadIgnoreFileRegExp,
            uploadType, packType, packVersion, packFileRegExp, packTpye
        } = actionSetting;

        const functionOptions = [
            { label: '开启LiveReload浏览器自动刷新', value: 'liveReload' },
            { label: '开启REM适配解决方案', value: 'rem' },
            { label: '开启文件版本(MD5)去缓存解决方案', value: 'md5' }
            // { label: '开启文件变动增量编译支持', value: 'fileAddCompileSupport' }
        ];


        const radioValue = 1;
        const packageValue = 1;
        const { getFieldDecorator } = this.props.form;


        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 17 }
            }
        };
        return (
            <Form className="projectSetting" layout="vertical" onSubmit={this.handleSubmit}>
                {
                    /*
                    <FormItem label="工作区路径">
                        <Input readOnly placeholder="工作区路径" size="small" value={workSpace} />
                    </FormItem>
                    */
                }
                <FormItem label="功能">
                    {getFieldDecorator('choseFunctions', {
                        initialValue: choseFunctions
                    })(<CheckboxGroup className="functionGroup" options={functionOptions} />)}
                </FormItem>
                <div className="modulName">上传模式配置</div>
                <InputGroup size="small" >
                    <FormItem {...formItemLayout} label="IP">
                        {getFieldDecorator('uploadHost', {
                            initialValue: uploadHost
                        })(<Input placeholder="服务器地址" size="small" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="用户名">
                        {getFieldDecorator('uploadUser', {
                            initialValue: uploadUser
                        })(<Input placeholder="用户名" size="small" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="密码">
                        {getFieldDecorator('uploadPass', {
                            initialValue: uploadPass
                        })(<Input placeholder="密码" type="password" size="small" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="端口号">
                        {getFieldDecorator('uploadPort', {
                            initialValue: uploadPort
                        })(<Input placeholder="端口号" size="small" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="远程路径">
                        {getFieldDecorator('uploadRemotePath', {
                            initialValue: uploadRemotePath
                        })(<Input placeholder="远程路径" size="small" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="文件过滤">
                        {getFieldDecorator('uploadIgnoreFileRegExp', {
                            initialValue: uploadIgnoreFileRegExp
                        })(<Input placeholder="过滤上传文件(支持正则匹配)" size="small" />)}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('uploadType', {
                            initialValue: uploadType
                        })(<RadioGroup onChange={this.onUploadChange}>
                            <Radio value="sftp">SFTP</Radio>
                            <Radio value="ftp">FTP</Radio>
                        </RadioGroup>)}
                    </FormItem>
                </InputGroup>
                <div className="modulName">打包</div>
                <InputGroup size="small" >
                    <FormItem {...formItemLayout} label="版本号">
                        {getFieldDecorator('packVersion', {
                            initialValue: packVersion
                        })(<Input placeholder="版本号" size="small" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="命名规则">
                        {getFieldDecorator('packFileRegExp', {
                            initialValue: packFileRegExp
                        })(<Input placeholder="自定义命名规则" size="small" />)}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('packType', {
                            initialValue: packType
                        })(<RadioGroup >
                            <Radio value="zip">zip</Radio>
                            <Radio value="rar">rar</Radio>
                           </RadioGroup>)}
                    </FormItem>
                </InputGroup>
                <FormItem className="buttons">
                    <Button type="primary" htmlType="submit">保存</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                        重置
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

class SeniorDevelopSetting extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (values) => {
        console.log(values);
        const { submitHandler } = this.props;
        const obj = {};
        obj.choseModules = values;
        submitHandler(obj);
    }

    choseHasModules = (e) => {
        if (e.target.checked) { // 导入模块
            const { importModulesHandler } = this.props;
            importModulesHandler();
        } else { // 去除模块
            const { delModulesHandler } = this.props;
            delModulesHandler();
        }
    }

    changeProjectType = (e) => {
        const { submitHandler } = this.props;
        const obj = {};
        obj.projectType = e.target.value;
        submitHandler(obj);
    }

    render() {
        const {
            actionSetting, selectedIndex, importModulesHandler, delModulesHandler
        } = this.props;
        const { modules, choseModules, projectType } = actionSetting;
        const { getFieldDecorator } = this.props.form;

        const options = [
            { label: '普通', value: 'normal' },
            { label: 'rhyton', value: 'rhyton' }
        ];
        return (
            <Form layout="vertical" className="moduleSetting" onSubmit={this.handleSubmit}>
                {
                    <FormItem label="模块化选择">
                        <Checkbox className="hasModuleSetting" checked={modules.length > 0} onChange={this.choseHasModules}>是否含有模块</Checkbox>
                    </FormItem>
                }
                {
                    <FormItem label="项目类型选择">
                        {
                            getFieldDecorator('projectType', {
                                initialValue: projectType
                            })(<RadioGroup options={options} onChange={this.changeProjectType} />)
                        }
                        }
                    </FormItem>
                }
                {
                    modules.length > 0 &&
                    <FormItem label="模块设置">
                        {
                            getFieldDecorator('choseModules', {
                                initialValue: choseModules
                            })(<CheckboxGroup options={modules} onChange={this.onChange} />)
                        }
                    </FormItem>
                }
            </Form>
        );
    }
}


const WrappedActionSettingForm = Form.create({
    mapPropsToFields(props) {
        return {
            choseFunctions: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.choseFunctions,
            uploadHost: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.uploadHost,
            uploadUser: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.uploadUser,
            uploadPass: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.uploadPass,
            uploadPort: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.uploadPort,
            uploadRemotePath: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.uploadRemotePath,
            uploadIgnoreFileRegExp: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.uploadIgnoreFileRegExp,
            uploadType: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.uploadType,
            packVersion: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.packVersion,
            packFileRegExp: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.packFileRegExp,
            packType: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.packType
        };
    }
})(ActionSettingForm);
const WrappedSeniorDevelopSettingForm = Form.create({
    mapPropsToFields(props) {
        return {
            choseModules: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.choseModules,
            projectType: JSON.stringify(props.actionSetting) == '{}' && props.actionSetting.projectType
        };
    }
})(SeniorDevelopSetting);

export default class ActionSetting extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {
            actionSetting, selectedIndex, submitProjectSettingHandler, importModulesHandler, delModulesHandler
        } = this.props;
        return (
            <div className="action-setting">
                <Tabs defaultActiveKey="1" className="actionSettingHeader">
                    <TabPane tab={<span><Icon type="apple" />项目设置</span>} key="1">
                        { Object.keys(actionSetting).length > 0 && <WrappedActionSettingForm actionSetting={actionSetting} selectedIndex={selectedIndex} submitHandler={submitProjectSettingHandler} /> }
                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />开发高级设置</span>} key="2">
                        { Object.keys(actionSetting).length > 0 && <WrappedSeniorDevelopSettingForm
                            actionSetting={actionSetting}
                            selectedIndex={selectedIndex}
                            submitHandler={submitProjectSettingHandler}
                            importModulesHandler={importModulesHandler}
                            delModulesHandler={delModulesHandler}
                        /> }
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
