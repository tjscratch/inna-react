import React, { PropTypes } from 'react';
import styles from './PopupMessage.scss';
import withStyles from '../../../decorators/withStyles';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

import Overlay from '../Overlay';

@withStyles(styles) class PopupMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    closeClick() {
        if (this.props.close) {
            this.props.close();
        }
    }

    render() {
        var { className } = this.props;
        var customClassName = "b-popup-message";
        if (className) {
            customClassName += " " + className;
        }

        return (
            <Overlay>
                <div className={customClassName}>
                    {
                        this.props.close ?
                        <div className="b-close-btn" onClick={this.closeClick.bind(this)}>
                            <i className="b-close-btn__img icon-emb-cancel"></i>
                        </div> : null
                    }
                    {this.props.children}
                </div>
            </Overlay>
        );
    }
}

export default PopupMessage;