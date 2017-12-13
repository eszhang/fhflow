
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

import '../style/digital-list.scss';

/**
 * （数据模拟展示）
 * @export
 * @function DigitalList
 */

function DigitalList(props) {

    let { title, contents = [], link = { text: "link", href: "#" } } = props.data;

    return (
        <div className="digital-list">
            <h2>{title}</h2>
            {
                contents.map((m, index) => (
                    <div key={index}>
                        <h3>{m.subTitle}</h3>
                        <p>{m.subContent}</p>
                    </div>
                ))
            }   
            <Button type="primary" onClick={() => { window.open(link.href, "_blank") }}>
                {link.text}<Icon type="right" />
            </Button>
        </div>
    )
}

DigitalList.propTypes = {
    data: PropTypes.object.isRequired
}

export default DigitalList;