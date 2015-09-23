import React, { PropTypes } from 'react';
import styles from './Spinner.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles) class Spinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="b-spinner">
                <div className="b-spinner-rect b-spinner-rect_rect1"></div>
                <div className="b-spinner-rect b-spinner-rect_rect2"></div>
                <div className="b-spinner-rect b-spinner-rect_rect3"></div>
                <div className="b-spinner-rect b-spinner-rect_rect4"></div>
                <div className="b-spinner-rect b-spinner-rect_rect5"></div>
            </div>
        );
    }
}

export default Spinner;