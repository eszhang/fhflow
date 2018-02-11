import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import ItemList from '../../common/itemList';
import {
    updateDocList
} from '../actions';
import { actions as wrapActions } from '../../wrap';
import docListData from './data';
import './style.scss';

/**
 * （文档列表展示）
 * @export
 * @function DocList
 */

const DocList = (props) => {
    const {
        data, page, updateHandler, openLink
    } = props;
    const {
        pageNo = 1, pageSize = 10, totalRows = 0, totalPages = 0
    } = page;

    return (
        <div className="doc-list">
            <ItemList data={data} extraText="查看" onDocClick={openLink} />
            {
                totalPages > 1 && <Pagination current={pageNo} pageSize={pageSize} total={totalRows} onChange={(pn, ps) => updateHandler(pn, ps)} />
            }
        </div>
    );
};

DocList.propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.object.isRequired
};

DocList.defaultProps = {
    data: [],
    page: {}
};

function mapStateToProps(state) {
    return state.docList;
}

function mapDispatchToProps(dispatch) {
    return {
        updateHandler(pageNo, pageSize) {
            dispatch(updateDocList(docListData, pageNo, pageSize));
        },
        openLink: bindActionCreators(wrapActions.openLink, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DocList);
