import React, { PropTypes } from 'react';
import styles from './TabsNav.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class TabsNav extends React.Component {


    render() {
        return (
            <div className="b-tabs-nav">
                <a href="#" className="b-tabs-nav__item b-tabs-nav__item_active">Перелет + отель</a>
                { (false) ? <a href="#" className="b-tabs-nav__item">Авиабилеты</a> : null }
            </div>
        );
    }

}

export default TabsNav;
