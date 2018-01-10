
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import '../style/status-bar.scss';

/**
 * （状态栏）
 * @export
 * @function StatusBar
 */

class StatusBar extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.scrollWrapper.scrollTop = this.scrollWrapper.scrollHeight;
        }, 400);
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.scrollWrapper.scrollTop = this.scrollWrapper.scrollHeight;
        }, 150);
    }

    render() {
        const { data, deleteHandler } = this.props;

        return (
            <div className="status-bar">
                <a className="opt-btn delete" onClick={deleteHandler}><Icon type="delete" /></a>
                <div ref={(dom) => { this.scrollWrapper = dom; }}>
                    <ul>
                        {
                            data.map((info, index) => (
                                <li key={index}>
                                    <div dangerouslySetInnerHTML={{ __html: `${info.desc}` }} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

StatusBar.propTypes = {
    data: PropTypes.array.isRequired
};

export default StatusBar;
