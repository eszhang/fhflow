
import React from 'react';
import { Icon } from 'antd';
import '../style/project-mask.scss';

/**
 * @function ActionMenu
 */

export function ProjectMask(props) {
    const { addProjectHandler = function () { } } = props;
    return (
        <div className="projectMask"><div className="content">
            {/* <div className="description">请添加项目</div> */}
            <Icon type="folder-add" onClick={addProjectHandler.bind(this)} className="folderAdd" title="请点击添加项目" />
                                     </div>
        </div>
    );
}
