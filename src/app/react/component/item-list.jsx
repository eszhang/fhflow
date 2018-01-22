
import React from 'react';
import { Card, Row, Col } from 'antd';

import '../style/item-list.scss';

/**
 * （列表展示）
 * @export
 * @function ItemList
 */

export default function ItemList(props) {
    const { data = [], extraText = '查看', onDocClick } = props;
    return (
        <div className="item-list">
            <Row gutter={16}>
                {
                    data.map((m, index) => (
                        <Col span={8} key={index}>
                            <Card title={m.title} bordered={false} extra={<DocLink clickHandler={onDocClick} link={m.href} content={extraText} />}>{m.desc}</Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}

class DocLink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { clickHandler, link, content } = this.props;
        return (
            <a onClick={e => clickHandler(link)}>{content}</a>
        );
    }
}
