
import React from 'react';

/**
 * @class StatusBar
 * @extends {Component}
 */

export function StatusBar(props) {
    return (
        <div className="status-bar">
            <ul className="status-bar-inner">
                {
                    props.data.map((text, index) => (
                        <li key={index}>
                            <a>{text}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}