import React, { PropTypes } from 'react';
import styles from './PopupMessage.scss';
import withStyles from '../../../decorators/withStyles';

import Overlay from '../Overlay';
import Spinner from '../Spinner';

@withStyles(styles) class PopupMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data;
        return (
            <Overlay>
                <div className="b-popup-message">
                    <div className="b-wait-msg">
                        <Spinner />

                        <div className="b-wait-msg__title">
                            {data ? data.title : ''}
                        </div>
                        <div className="b-wait-msg__text">
                            {data ? data.text : ''}
                        </div>
                    </div>
                </div>
            </Overlay>
        );
    }
}

export default PopupMessage;