
import React from 'react';

/**
 * @function ActionMenu
 */

export function ActionMenu(props) {

    const { data = [], selectedIndex = 0, onClickHandler = function () { } } = props;
    return (
        <ul className="action-menu">
            {
                data.map((m, index) => (
                    <li className={m.EN + ((selectedIndex === index) ? " active" : "")} title={m.CN} onClick={onClickHandler.bind(this, index)} key={index}>
                        <a></a>
                    </li>
                ))
            }
        </ul>
    )

}