import React from 'react';

function Item(props) {

    const { className, title, text, onClickHandler } = props;
    return (
        <li className={className} title={title} onClick={onClickHandler}>
            <a>{text}</a>
        </li>
    )
}

/**
 * @class action-menu
 * @extends {Component}
 */

export class ActionMenu extends React.Component {

    render() {

        const { data = [], selectedIndex = 0, onClickHandler } = this.props;
        return (
            <div className="activity-bar">
                <ul className="action-bar">
                    {
                        data.map((menu, index) => <Item  classsName={EN + (selectedIndex === index) ? "active" : ""} title={menu.CN} onClickHandler={onClickHandler.bind(this, index)} key={index} />)
                    }
                </ul>
            </div>
        )
    }
}