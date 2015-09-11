import React, { PropTypes } from 'react';
import styles from './MainPage.css';
import withStyles from '../../decorators/withStyles';
import OffersSlider from '../OffersSlider';
import OffersLanding from '../OffersLanding';
import OffersList from '../OffersList';

@withStyles(styles) class MainPage {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    /*
     <div className="b-main-page__slider">
     <OffersSlider />
     </div>
     <div className="b-main-page__offers-landing">
     <OffersLanding />
     </div>
     */

    render() {
        let title = 'Инна-Тур';
        this.context.onSetTitle(title);
        return (
            <section className="main-page">
                <div className="b-main-page">

                    <div className="b-main-page__offers-list">
                        <OffersList {...this.props} />
                    </div>
                </div>
            </section>
        );
    }

}

export default MainPage;
