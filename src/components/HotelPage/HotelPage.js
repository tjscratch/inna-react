import React, { PropTypes } from 'react';
import styles from './HotelPage.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

@withViewport
@withStyles(styles) class HotelPage extends React.Component {
    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

    }

    render() {
        var title = 'Инна-Тур - Отель';
        this.context.onSetTitle(title);

        return null;
    }
}

export default HotelPage;
