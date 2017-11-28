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
    const { selectedIndex = 0, onClickHandler = function () { } } = props;
    const data = [];

    for (let i = 0; i < 5; i++) {
        data.push({
            key: i,
            class: 'project-floader',
            name: `Floader ${i}`,
            path: `E://test/${i}`,
        });
    }
    
    return (
        <div className="project-list">
            <Button type="primary" className="add-project" onClick={() => { window.open("#", "_blank") }}>
                新增
            </Button>
            <ul className="project-list-ul">
                {
                    data.map((m, index) => (
                        <li className={m.class + ((selectedIndex === index) ? " active" : "")} title={m.path} onClick={onClickHandler.bind(this, index)} key={index}>
                            <Icon type="folder" />
                            <div className="project-info">
                                <div>{m.name}</div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
