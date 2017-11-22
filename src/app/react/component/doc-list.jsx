
import React from 'react';
import { Card, Col, Row, Pagination } from 'antd';

/**
 * @class DocList
 * @extends {Component}
 */

export function DocList(props) {
    const { data, index, handleChange } = props;
    return (
        <div className="doc-list">
            <Row gutter={16}>
                {
                    data.map((item, index) => (
                        <Col span={8} key={index}>
                            <Card title={item.title} bordered={false} extra={<a href={item.href}>More</a>}>{item.desc}</Card>
                        </Col>
                    ))
                }
            </Row>
            <Pagination defaultCurrent={index} total={data.length} onChange={(page, pageSize) => handleChange(page, pageSize)} />
        </div>
    )
}   