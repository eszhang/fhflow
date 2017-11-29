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
export default function projectList(props) {
    const {data= {}, selectedIndex = 0, onClickHandler = function () { } } = props;
    
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
            <div className="project-list-footer clearfix">
                <div className="plf-left">
                    {
                        data.projectLeftOperateData.map((n, index) => (
                            <a key={index}>
                                <Icon type={n.icon} title={n.title} />
                            </a>
                        ))
                    }
                </div>
                <div className="plf-right">        
                     {
                        data.projectRightOperateData.map((n, index) => (
                            <a key={index}>
                                {n.name}
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
