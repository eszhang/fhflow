import React from 'react';
import { Button, Icon, Modal} from 'antd';

import '../style/project-list.scss';

const confirm = Modal.confirm;
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
        switch(type){
            case 'add': 
                this.add();
                break;
            case 'del': 
                this.del(data);
                break;
            case 'open': 
                this.open();
                break;

        }
    }


    plfRightClickHandler = (e) => {
       
    }
    
    add = () => {
        const projectListData = this.props.data.data;  
        const newKey = projectListData[projectListData.length - 1].key + 1;
        const targetData = {
            key: newKey,
            class: 'project-floader',
            name: 'newProject' + newKey,
            path: 'E://test/newProject' + newKey
        };
        this.props.addProjectHandler(targetData);
    }

    del = (data) => {
        var that = this;
        confirm({
            title: '您确认删除该项目吗？',
            onOk() {
                that.props.delProjectHandler(data.selectedIndex);
            }
        });
    }

    open = () => {
        alert('打开目标文件夹');
    }

    render() {
        const {data= {},onClickHandler = function () { } } = this.props;
        // this.state = data;
        return (
            <div className="project-list">
                <ul className="project-list-ul">
                    {
                        data.data.map((m, index) => (
                            <li className={m.class + ((data.selectedIndex === index) ? " active" : "")} title={m.path} onClick={onClickHandler.bind(this, index)} key={index}>
                                <Icon type="folder" />
                                <div className="project-info">
                                    <div className="folderName" >{m.name}</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="project-list-footer clearfix" >
                    <div className="plf-left">
                        <a  onClick={() => this.plfLeftClickHandler('add',data)}>
                            <Icon type="folder-add" title="增加项目" />
                        </a>
                        
                        <a onClick={() => this.plfLeftClickHandler("del",data)}>
                            <Icon type="delete" title="删除项目" />
                        </a>
                        
                        <a onClick={() => this.plfLeftClickHandler("open",data)}>
                            <Icon type="folder-open" title="打开项目" />
                        </a>

                        <a >
                            <Icon type="setting" title="全局设置" />
                        </a>
                    </div>
                    <div className="plf-right">        
                        {
                            data.rightOperateData.map((n, index) => (
                                <a key={index} >
                                    {n.name}
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}


