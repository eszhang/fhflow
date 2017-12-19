import React from 'react';
import { Button, Icon, Modal, Form, Input } from 'antd';
import _ from 'lodash';

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
            confirmLoading: false,
            floderName:'folder'
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
                that.props.updateStatusList([]);
            }
        });
    }

    open = (e,index) => {
        
        this.props.onClickHandler(index);
        this.props.openProjectHandler();
        e.stopPropagation();
    }

    dev = (data) => {
        if(!data.data[data.selectedIndex].isRunning){
            !data.data[data.selectedIndex].isDeveloping && this.props.changeRunStatusHandler(data.selectedIndex);
            this.props.changeDevStatusHandler(data.selectedIndex);
        }
    }

    upload = (data) => {
        if(!data.data[data.selectedIndex].isRunning){
            !data.data[data.selectedIndex].isUploading && this.props.changeRunStatusHandler(data.selectedIndex);
            this.props.changeUploadStatusHandler(data.selectedIndex);
        }
    }

    pack = (data) => {
        if(!data.data[data.selectedIndex].isRunning){
            !data.data[data.selectedIndex].isPackageing && this.props.changeRunStatusHandler(data.selectedIndex);
            this.props.changePackStatusHandler(data.selectedIndex);
        }
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


    mouseEnterHandle = (index, data)=>{
        data[index].logo = 'folder-open'
        this.props.setProjectData(data)
    }

    mouseLeaveHandle = (index, data)=>{
        data[index].logo = 'folder'
        this.props.setProjectData(data)
    }

    renameProjectHandler = (target, index, data)=>{
        data[index].nowName = data[index].name
        data[index].willName = target
        this.props.setProjectData(data);
    } 

    changeEdit = (e,index, data)=>{
        data[index].editable === false ? (data[index].editable = true) : undefined;
        this.props.setProjectData(data)
        e.stopPropagation();
    }

    closeEditHandle = (e,data) => {
        var obj = _.find(data, function(pro) {
            return pro.editable === true;
        })
        if( obj !== undefined ){
            for(let i = 0; i < data.length; i++){
                data[i].editable = false;
            }
            this.props.setProjectData(data)
            this.props.updateProjectName()
        }
    }

    render() {
        const { data = {}, onClickHandler = function () { } } = this.props;

        let selectedProject = data.data && data.data[data.selectedIndex],
            { isDeveloping, isUploading, isPackageing, isRunning } = selectedProject || {};
        

        return (
            <div className="project-list" onClick={(e)=>{this.closeEditHandle(e, data.data)}}>
                <ul className="project-list-ul">
                    {
                        (data.data !== undefined && data.data.length !== 0) ? data.data.map((m, index) => (
                            <li className={m.class + ((data.selectedIndex === index) ? " active" : "")} title={m.path} onClick={onClickHandler.bind(this, index)}  key={index}>
                                <Icon type={m.logo} onMouseEnter={()=>{this.mouseEnterHandle(index, data.data)}} onMouseLeave={()=>{this.mouseLeaveHandle(index, data.data)}} onClick={(e)=>{this.open(e,index)}} />
                                <div className="project-info">
                                    <EditableCell
                                        className={this.state.floderName}
                                        editable={m.editable}
                                        value={m.willName}
                                        index={index}
                                        data={data.data}
                                        changeEdit = {( e, index, data)=>this.changeEdit(e,index,data)}
                                        onChange={(value,index,data) => this.renameProjectHandler(value,index,data)}
                                    />
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
                            (data.data !== undefined && data.data.length !== 0) > 0 &&
                            <a onClick={() => this.plfLeftClickHandler("del", data)}>
                                <Icon type="delete" title="删除项目" />
                            </a>
                        }
                        <a onClick={() => this.plfLeftClickHandler('globalSetting', data)}>
                            <Icon type="setting" title="全局设置" />
                        </a>

                        <WrappedGlobalSettingForm ref={this.saveFormRef} workSpace={data.workSpace} visible={this.state.modalVisible} ModalText={this.state.ModalText} confirmLoading={this.state.confirmLoading} handleCancel={this.handleCancel} handleOk={this.handleOk} />

                    </div>
                    <div className="plf-right" >
                        {
                            (data.data !== undefined && data.data.length !== 0) > 0 &&
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
                                {
                                    isRunning && <div className="runningMask"></div>
                                }
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

const EditableCell = ({ editable, value, onChange, changeEdit, index, data }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onClick={e => changeEdit(e,index,data)} onChange={e => onChange(e.target.value,index, data)} />
            : <div className="staticProjectName"  onClick={e => changeEdit(e,index,data)}>{value}</div>
        }
    </div>
);
const WrappedGlobalSettingForm = Form.create()(GlobalSettingForm);
// const WrappedProjectInfoForm = Form.create()(ProjectInfoForm);
