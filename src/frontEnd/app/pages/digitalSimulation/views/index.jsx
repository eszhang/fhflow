import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import { actions as wrapActions } from '../../wrap';
import digitalListData from './data';
import './style.scss';

/**
 * （数据模拟展示）
 * @export
 * @function DigitalList
 */

const DigitalList = (props) => {
    const {
        title, contents, outLink, openLink
    } = props;

    return (
        <div className="digital-list">
            <div>
                <h2>{title}</h2>
                {
                    contents.map((m, index) => (
                        <div key={index}>
                            <h3>{m.subTitle}</h3>
                            <p>{m.subContent}</p>
                        </div>
                    ))
                }
                <div className="btn-area">
                    <Button type="primary" onClick={() => openLink(outLink.href)}>
                        {outLink.text}<Icon type="right" />
                    </Button>
                </div>

            </div>
        </div>
    );
};

DigitalList.propTypes = {
    title: PropTypes.string.isRequired,
    contents: PropTypes.array.isRequired,
    outLink: PropTypes.object.isRequired

};

DigitalList.defaultProps = {
    title: '',
    contents: [],
    outLink: {
        text: 'link',
        href: '#'
    }
};

function mapStateToProps() {
    return digitalListData;
}

function mapDispatchToProps(dispatch) {
    return {
        openLink: bindActionCreators(wrapActions.openLink, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DigitalList);
