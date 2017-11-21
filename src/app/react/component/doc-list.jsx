
import React from 'react';
import { Card, Col, Row, Pagination } from 'antd';

/**
 * @class DocList
 * @extends {Component}
 */

export class DocList extends React.Component {
    constructor(props) {
        super(props)
    }

    handleChange(page, pageSize){
        console.log(page, pageSize)
    }
    render() {

        return (
            <div className="doc-list">
                <Row gutter={16}>
                    {
                        this.props.data.map((docObj, index) => (
                            <Col span={8} key={index}>
                                <Card title={docObj.title} bordered={false} extra={<a href={docObj.href}>More</a>}>{docObj.desc}</Card>
                            </Col>
                        ))
                    }
                </Row>
                <Pagination defaultCurrent={1} total={50} onChange={(page, pageSize) => this.handleChange(page, pageSize)} />
            </div>
        )
    }
}   