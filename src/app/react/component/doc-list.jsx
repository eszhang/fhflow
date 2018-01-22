
import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import ItemList from './item-list';

import '../style/doc-list.scss';

/**
 * （文档列表展示）
 * @export
 * @function DocList
 */

function DocList(props) {
    let { updateHandler, onClickHandler } = props,
        { data = [], page = {} } = props.data,
        {
            pageNo = 1, pageSize = 10, totalRows = 0, totalPages = 0
        } = page;

    return (
        <div className="doc-list">
            <ItemList data={data} extraText="查看" onDocClick={onClickHandler} />
            {totalPages > 1 && <Pagination current={pageNo} pageSize={pageSize} total={totalRows} onChange={(pageNo, pageSize) => updateHandler(pageNo, pageSize)} />}
        </div>
    );
}

DocList.propTypes = {
    data: PropTypes.object.isRequired,
    updateHandler: PropTypes.func.isRequired
};

export default DocList;
