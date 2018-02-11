
import React from 'react';
import PropTypes from 'prop-types';

import '../style/action-menu.scss';

/**
 * @function ActionMenu
 */

export default function ActionMenu(props) {
    const { data = [], selectedIndex = 0, onClickHandler = function () { } } = props;
    return (
        <ul className="action-menu">
            {
                data.map((m, index) => (
                    <li className={m.EN + ((selectedIndex === index) ? ' active' : '')} title={m.CN} onClick={() => onClickHandler(index)} key={index}>
                        <a />
                    </li>
                ))
            }
        </ul>
    );
}

ActionMenu.propTypes = {
    data: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number.isRequired
};
