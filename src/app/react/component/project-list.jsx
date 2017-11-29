import React from 'react';
import { Button, Icon} from 'antd';

import '../style/project-list.scss';


/**
 * 
 * projectList
 * @export
 * @param {any} props 
 * @returns 
 */
// export default function projectList(props) {
export default class projectList extends React.Component {

    constructor(props) {
        super(props);
    }

    //底部左侧操作区点击事件 
    /**
     * 
     * 
     * @memberof projectList
     * @param {type} 操作类型
     * @param {selectedIndex} 选中的项目
     */
    plfLeftClickHandler = (type, selectedIndex) => {
        switch(type){
            case 'add': 
                this.add();
                break;
            case 'del': 
                this.del(selectedIndex);
                break;
            case 'open': 

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
        // projectListData.push(targetData);  
        // this.state.projectListData = projectListData;
        // this.setState( { projectListData: projectListData } );
        const { addProjectHandler } = this.props;
        addProjectHandler(targetData);
    }

    del = (index) => {
        const { delProjectHandler } = this.props;
        delProjectHandler(index);
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
                            <li className={m.class + ((data.selectedIndex === index) ? " active" : "")}  onClick={onClickHandler.bind(this, index)} key={index}>
                                <Icon type="folder" />
                                <div className="project-info">
                                    <div className="folderName" title={m.name}>{m.name}</div>
                                    {(data.selectedIndex === index) && <div className="folderPath" title={m.path}>{m.path}</div>}
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="project-list-footer clearfix" >
                    <div className="plf-left">
                        {
                            data.leftOperateData.map((n, index) => (
                                <a key={index} onClick={() => this.plfLeftClickHandler(n.type,data.selectedIndex)}>
                                    <Icon type={n.icon} title={n.title} />
                                </a>
                            ))
                        }
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
