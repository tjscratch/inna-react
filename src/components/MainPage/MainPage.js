import React, { PropTypes } from 'react';
import styles from './MainPage.scss';
import withStyles from '../../decorators/withStyles';
import OffersSlider from '../OffersSlider';
import OffersLanding from '../OffersLanding';
import OffersList from '../OffersList';
import SearchForm from '../SearchForm';

@withStyles(styles) class MainPage extends React.Component {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    render() {
        let title = 'Инна-Тур';
        this.context.onSetTitle(title);
        return (
            <section className="b-main-page">
                <div className="b-main-page__slider">
                    <OffersSlider />
                </div>
                <div className="b-main-page__offers-list">
                    <OffersList {...this.props} />
                </div>
            </section>
        );
    }

}

export default MainPage;
