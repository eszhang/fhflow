
import React from 'react';
import { Card, Col, Row, Pagination } from 'antd';

/**
 * @class DocList
 * @extends {Component}
 */

export function DocList(props) {

    return (
        <div className="doc-list">
            <Row gutter={16}>
                {
                    props.data.map((docObj, index) => (
                        <Col span={8} key={index}>
                            <Card title={docObj.title} bordered={false} extra={<a href={docObj.href}>More</a>}>{docObj.desc}</Card>
                        </Col>
                    ))
                }
            </Row>  
            <Pagination defaultCurrent={1} total={50} onChange={}/>
        </div>
    )
}   