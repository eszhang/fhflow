
import React from 'react';
import Icon from 'antd/lib/icon'

/**
 * @class StatusBar
 * @extends {Component}
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