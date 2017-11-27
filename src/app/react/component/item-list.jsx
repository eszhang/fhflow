
import React from 'react';
import { Card, Row, Col } from 'antd';

import '../style/item-list.scss';

/**
 * （列表展示）
 * @export
 * @function ItemList
 */

export default function ItemList(props) {
    const { data = [], extraText = "查看" } = props;
    return (
        <div className="item-list">
            <Row gutter={16}>
                {
                    data.map((m, index) => (
                        <Col span={8} key={index}>
                            <Card title={m.title} bordered={false} extra={<a href={m.href} target="_blank">{extraText}</a>}>{m.desc}</Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}   