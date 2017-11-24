
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateDocList } from '../../redux/action/index';

import { Pagination } from 'antd';
import ItemList  from './item-list';

import docListData from '../../redux/data/doc-list';

import '../style/doc-list.scss';

/**
 * （文档列表）
 * @export
 * @class DocList
 * @extends Component
 */

const pageSize = 9;

class DocList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.updateDocList(docListData, 1, pageSize);
    }

    handleChange(pageNo, pageSize) {
        this.props.updateDocList(docListData, pageNo, pageSize);
    }

    render() {

        let { docList, updateDocList } = this.props,
            { data = [], page = {} } = docList,
            { pageNo = 1, pageSize = 10, totalRows = 0 } = page;

        console.log(this.props)
        return (
            <div className="doc-list">
                <ItemList data={data} extraText="查看" />
                <Pagination current={pageNo} pageSize={pageSize} total={totalRows} onChange={(page, pageSize) => this.handleChange(page, pageSize)} />
            </div>
        )
    }
}

export default connect(state => ({
    docList: state.docList
}), dispatch => ({
    updateDocList: bindActionCreators(updateDocList, dispatch)
}))(DocList);