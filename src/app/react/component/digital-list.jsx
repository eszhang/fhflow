
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
    const { title, contents = [], link = { text: 'link', href: '#' } } = props.data;
    const { onClickHandler } = props;
    return (
        <div className="digital-list">
            <div>
                <h2>{title}</h2>
                {
                    contents.map((m, index) => (
                        <div key={index}>
                            <h3>{m.subTitle}</h3>
                            <p>{m.subContent}</p>
                        </div>
                    ))
                }
                <div className="btn-area">
                    <Button type="primary" onClick={e => onClickHandler(link.href)}>
                        {link.text}<Icon type="right" />
                    </Button>
                </div>

            </div>
        </div>
    );
}

DigitalList.propTypes = {
    data: PropTypes.object.isRequired
};

export default DigitalList;
