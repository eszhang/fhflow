import React from 'react';
import { Button, Icon, Modal, Form, Input } from 'antd';

import '../style/project-list.scss';

const confirm = Modal.confirm;
const FormItem = Form.Item;
/**
 * 
 * projectList
 * @export
 * @param {any} props 
 * @returns 
 */
// export default function projectList(props) {
export default class ProjectList extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            ModalText: '',
            confirmLoading: false
        }
    }

    //底部左侧操作区点击事件 
    /**
     * 
     * 
     * @memberof ProjectList
     * @param {type} 操作类型
     * @param {selectedIndex} 选中的项目
     */
    plfLeftClickHandler = (type, data) => {
        switch (type) {
            case 'add':
                this.add();
                break;
            case 'del':
                this.del(data);
                break;
            case 'open':
                this.open();
                break;
            case 'globalSetting':
                this.globalSetting();
                break;
        }
    }


    plfRightClickHandler = (type, data) => {
        switch (type) {
            case 'dev':
                this.dev(data);
                break;
            case 'upload':
                this.upload(data);
                break;
            case 'package':
                this.pack(data);
                break;
        }
    }

    add = () => {
        this.props.addProjectHandler();
    }

    del = (data) => {
        var that = this;
        confirm({
            title: '您确认删除该项目吗？',
            onOk() {
                that.props.delProjectHandler();
            }
        });
    }

    open = () => {
        this.props.openProjectHandler();
    }

    dev = (data) => {
        this.props.changeDevStatusHandler(data.selectedIndex);
    }

    upload = (data) => {
        this.props.changeUploadStatusHandler(data.selectedIndex);
    }

    pack = (data) => {
        this.props.changePackStatusHandler(data.selectedIndex);
    }


    globalSetting = () => {
        this.setState({ modalVisible: true });
    }

    //全局设置弹窗取消按钮
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({ modalVisible: false });
    }

    handleOk = () => {
        this.form.validateFields((err, values) => {
            this.props.setWorkSpace(values.workSpace);
            if (!err) {
                this.setState({
                    ModalText: '设置成功,页面将在2s后关闭',
                    confirmLoading: true
                });
                setTimeout(() => {
                    this.setState({
                        modalVisible: false,
                        confirmLoading: false,
                        ModalText: '',
                    });
                }, 2000);
            }
        });

    }

    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
        const { data = {}, onClickHandler = function () { } } = this.props;

        // this.state = data;

        let selectedProject = data.data && data.data[data.selectedIndex],
            { isDeveloping, isUploading, isPackageing } = selectedProject || {};

        return (
            <div className="project-list">
                <ul className="project-list-ul">
                    {
                        data.data.length !== 0 ? data.data.map((m, index) => (
                            <li className={m.class + ((data.selectedIndex === index) ? " active" : "")} title={m.path} onClick={onClickHandler.bind(this, index)} key={index}>
                                <Icon type="folder" />
                                <div className="project-info">
                                    <div className="folderName" >{m.name}</div>
                                </div>
                            </li>
                        ))
                            :
                            <div></div>
                    }
                </ul>
                <div className="project-list-footer clearfix" >
                    <div className="plf-left">
                        <a onClick={() => this.plfLeftClickHandler('add', data)}>
                            <Icon type="folder-add" title="增加项目" />
                        </a>
                        {
                            data.data.length > 0 &&
                            <a onClick={() => this.plfLeftClickHandler("del", data)}>
                                <Icon type="delete" title="删除项目" />
                            </a>
                        }
                        {
                            data.data.length > 0 &&
                            <a onClick={() => this.plfLeftClickHandler("open", data)}>
                                <Icon type="folder-open" title="打开项目" />
                            </a>
                        }

                        <a onClick={() => this.plfLeftClickHandler('globalSetting', data)}>
                            <Icon type="setting" title="全局设置" />
                        </a>

                        <WrappedGlobalSettingForm ref={this.saveFormRef} workSpace={data.workSpace} visible={this.state.modalVisible} ModalText={this.state.ModalText} confirmLoading={this.state.confirmLoading} handleCancel={this.handleCancel} handleOk={this.handleOk} />

                    </div>
                    <div className="plf-right">
                        {
                            data.data.length > 0 &&
                            <div>
                                <a className={isDeveloping ? 'isRunning' : ''} onClick={() => this.plfRightClickHandler('dev', data)}>
                                    {isDeveloping ? '监听中...' : '开发'}
                                </a>
                                <a className={isUploading ? 'isRunning' : ''} onClick={() => this.plfRightClickHandler('upload', data)}>
                                    {isUploading ? '处理中...' : '上传'}
                                </a>
                                <a className={isPackageing ? 'isRunning' : ''} onClick={() => this.plfRightClickHandler('package', data)}>
                                    {isPackageing ? '处理中...' : '打包'}
                                </a>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class GlobalSettingForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { visible, confirmLoading, ModalText, handleCancel, handleOk, workSpace } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal title="修改全局工作区路径"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <FormItem label="工作区路径">
                        {getFieldDecorator('workSpace', {
                            initialValue: workSpace,
                            rules: [{
                                required: true, message: '工作区路径不能为空',
                            }]
                        })(
                            <Input placeholder="全局工作区路径" />
                            )}
                    </FormItem>
                </Form>
                <p>{ModalText}</p>
            </Modal>



        )
    }
}

const WrappedGlobalSettingForm = Form.create()(GlobalSettingForm);
