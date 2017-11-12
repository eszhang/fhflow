
import React from 'react';

/**
 * @class main-menu
 * @extends {Component}
 */

export class ActionMenu extends React.Component{
    
    render(){

        const {actionMenus=[]} = this.props;
        return(
            <div className="activity-bar">
                <ul className="action-bar">
                    {
                        actionMenus.map((menu,index) =>(
                            <li key={index}>
                                <a>
                                    {menu.text}                                
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}