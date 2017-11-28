
import React from 'react';
import Icon from 'antd/lib/icon'

import '../style/status-bar.scss';

/**
 * （状态栏）
 * @export
 * @function StatusBar
 */

export function StatusBar(props) {

    const IconTypeMap = {
        info: "info-circle",
        warning: "exclamation-circle",
        success: "check-circle",
        error: "close-circle"
    };

    return (
        <ul className="status-bar">
            {
                props.data.map((info, index) => (
                    <li className={info.type} key={index}>
                        <a>
                            {info.type && <Icon type={IconTypeMap[info.type]} />}
                            {info.desc}
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}   