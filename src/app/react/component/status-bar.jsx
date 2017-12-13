
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

    constructor(props){
        super(props)
    }

    componentDidUpdate() {
        this.wrapper.scrollTop = this.wrapper.scrollHeight;
    }

    render() {

        let { data, deleteHandler} = this.props;

        const iconTypeMap = {
            info: "info-circle",
            warning: "exclamation-circle",
            success: "check-circle",
            error: "close-circle"
        };

        return (
            <div className="status-bar" ref={(dom) => { this.wrapper = dom }}>
                <a className="opt-btn delete" onClick = {deleteHandler}><Icon type="delete" /></a>
                <div>
                    <ul>
                        {
                            data.map((info, index) => (
                                <li className={info.type} key={index}>
                                    <a>
                                        {info.type && <Icon type={iconTypeMap[info.type]} />}
                                        {info.desc}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

StatusBar.propTypes = {
    data: PropTypes.array.isRequired
}

export default StatusBar;