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
                this.del(this.props.data.projectListData[selectedIndex]);
                break;
            case 'open': 

                break;

        }
    }


    plfRightClickHandler = (e) => {
       
    }
    
    add = () => {
        const projectListData = Object.assign([], this.state.projectListData);  
        const newKey = projectListData[projectListData.length - 1].key + 1;
        const targetData = {
            key: newKey,
            class: 'project-floader',
            name: 'newProject' + newKey,
            path: 'E://test/newProject' + newKey
        };
        projectListData.push(targetData);  
        // this.state.projectListData = projectListData;
        // this.setState( { projectListData: projectListData } );
    }

    del = (delProject) => {
        const obj = Object.assign([], this.state.projectListData);  
        const targetData = obj.filter(item => delProject.key !== item.key);
        this.state.projectListData = targetData;
        this.setState({ projectListData: this.state.projectListData });
    }

    open = () => {
        alert('打开目标文件夹');
    }

    render() {
        const {data= {}, selectedIndex = 0, onClickHandler = function () { } } = this.props;
        // this.state = data;
        return (
            <div className="project-list">
                <ul className="project-list-ul">
                    {
                        data.projectListData.map((m, index) => (
                            <li className={m.class + ((selectedIndex === index) ? " active" : "")}  onClick={onClickHandler.bind(this, index)} key={index}>
                                <Icon type="folder" />
                                <div className="project-info">
                                    <div className="folderName" title={m.name}>{m.name}</div>
                                    {(selectedIndex === index) && <div className="folderPath" title={m.path}>{m.path}</div>}
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="project-list-footer clearfix" >
                    <div className="plf-left">
                        {
                            data.projectLeftOperateData.map((n, index) => (
                                <a key={index} onClick={() => this.plfLeftClickHandler(n.type,selectedIndex)}>
                                    <Icon type={n.icon} title={n.title} />
                                </a>
                            ))
                        }
                    </div>
                    <div className="plf-right">        
                        {
                            data.projectRightOperateData.map((n, index) => (
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
