
import React from 'react';

import { Button, Icon, Table } from 'antd';

import digitalListData from '../../redux/data/digital-list';

import '../style/digital-list.scss';

/**
 * （请求代理展示）
 * @export
 * @function ProxyList
 */

export default function ProxyList(props) {
    const { title, contents, href } = props;
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
    }, {
        title: 'Age',
        dataIndex: 'age',
    }, {
        title: 'Address',
        dataIndex: 'address',
    }];

    const data = [];

    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }
    
    return (
        <div className="proxy-list">
            <Button type="primary" onClick={() => { window.open("#", "_blank") }}>
                新增
            </Button>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}