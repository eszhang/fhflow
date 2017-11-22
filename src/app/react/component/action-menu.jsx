
import React from 'react';

function Item(props) {

    const { text, className, title, onClickHandler } = props;
    return (
        <li className={className} title={title} onClick={onClickHandler}>
            <a>{text}</a>
        </li>
    )
}

/**
 * @class ActionMenu
 * @extends {Component}
 */

export class ActionMenu extends React.Component {

    render() {
        const { data = [], selectedIndex = 0, onClickHandler = function(){} } = this.props;
        return (
            <ul className="action-menu">
                {
                    data.map((menu, index) => <Item className={menu.EN + ((selectedIndex === index) ? " active" : "")} title={menu.CN} onClickHandler={index => onClickHandler(index)} key={index} />)
                }
            </ul>
        )
    }
}