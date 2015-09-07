import React, { PropTypes } from 'react';
import styles from './MainPage.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class MainPage {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    render() {
        let title = 'Инна-Тур';
        this.context.onSetTitle(title);
        return (
            <div className="MainPage">
                <div className="MainPage-container">
                    <h1>Перелет + Отель — новая альтернатива классическим турам</h1>
                </div>
            </div>
        );
    }

}

export default MainPage;
