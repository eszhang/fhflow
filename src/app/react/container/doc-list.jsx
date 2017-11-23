
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateDocList } from '../../redux/action/index';

import { Pagination } from 'antd';
import { ItemList } from '../component/item-list';

import docListData from '../../redux/data/docList';

import '../style/doc-list.scss';

/**
 * @class DocList
 * @extends Component
 */

const pageSize = 9;

class DocList extends React.Component {

    componentDidMount() {
        let { updateDocList } = this.props,
            index = 1,
            data = docListData.slice(0, pageSize);

        updateDocList(index, data)
    }

    handleChange(page, pageSize) {
        let { updateDocList } = this.props,
            index = page,
            data = docListData.slice((index - 1) * pageSize, index * pageSize);

        updateDocList(index, data)
    }

    render() {

        let { docList, updateDocList } = this.props;

        console.log(this.props)
        return (
            <div className="doc-list">
                <ItemList data={docList.data} />
                <Pagination current={docList.index} pageSize={pageSize} total={docListData.length} onChange={(page, pageSize) => this.handleChange(page, pageSize)} />
            </div>
        )
    }
}

export default connect(state => ({
    docList: state.docList
}), dispatch => ({
    updateDocList: bindActionCreators(updateDocList, dispatch)
}))(DocList);