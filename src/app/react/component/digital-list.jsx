
import React from 'react';

import digitalListData from '../../redux/data/digital-list';

import '../style/digital-list.scss';

/**
 * （数据模拟展示）
 * @export
 * @function DigitalList
 */

function DigitalList(props) {
    const { title, content } = props;
    return (
        <div className="digital-list">
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    )
}

export default function (props) {
    return <DigitalList {...digitalListData} />
}