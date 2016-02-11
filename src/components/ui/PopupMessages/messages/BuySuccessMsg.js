import React, { PropTypes } from 'react';
import styles from './BuySuccessMsg.scss';
import withStyles from '../../../../decorators/withStyles';
import Spinner from '../../Spinner';

import PopupMessage from '../PopupMessage.js';

@withStyles(styles) class BuySuccessMsg extends React.Component {
    constructor(props) {
        super(props);
    }

    cancelClick() {
        if (this.props.cancel) {
            this.props.cancel();
        }
    }

    render() {
        var data = this.props.data;
        return (
            <PopupMessage {...this.props}>
                <div className="b-wait-msg">
                    {
                        //<Spinner />
                    }

                    <div className="b-wait-msg__title">
                        {data ? data.title : ''}
                    </div>
                    <div className="b-wait-msg__text" dangerouslySetInnerHTML={{__html:data ? data.text : ''}}>
                    </div>
                    {
                        this.props.cancel ?
                        <div className="b-wait-msg__cancel" onClick={this.cancelClick.bind(this)}>
                            {data ? data.cancelText : ''}
                        </div> : null
                    }
                </div>
            </PopupMessage>
        );
    }
}

export default BuySuccessMsg;