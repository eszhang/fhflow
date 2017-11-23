
import React from 'react';
import { Card, Col, Row } from 'antd';

/**
 * @function ItemList
 */

export function ItemList(props) {
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