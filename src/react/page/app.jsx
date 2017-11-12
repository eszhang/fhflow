
import React from 'react';
import ReactDOM from 'react-dom';
import {ActionMenu} from './component/action-menu';

import './style/action-menu.scss';

import 'antd/dist/antd.css';


const actionMenus = [{
    text: "232",
    active: false,
    icon: ""
},{
    text: "55733",
    active: false,
    icon: ""
}];


ReactDOM.render(
    <ActionMenu actionMenus={actionMenus}/>,
    document.body.appendChild(document.createElement('div'))
)