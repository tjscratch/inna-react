import React, { PropTypes } from 'react';
import styles from './MainPage.scss';
import withStyles from '../../decorators/withStyles';
import OffersSlider from '../OffersSlider';
import OffersLanding from '../OffersLanding';
import OffersList from '../OffersList';
import SearchForm from '../SearchForm';

@withStyles(styles) class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            offersData: props.data
        }
    }

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    onItemsLoad(data) {
        //console.log('main page onItemsLoad', data);
        //console.log('this.refs',this.refs);


        //OfferLayouts[0]

        //Offer1
        //Offer2
        //Offer3
        //OfferLayoutType: "L2S"

        this.setState({
            offersData: data
        })
    }

    render() {
        let title = 'Инна-Тур';
        this.context.onSetTitle(title);
        return (
            <section className="b-main-page">
                <div className="b-main-page__slider">
                    <OffersSlider />
                    <SearchForm onItemsLoad={this.onItemsLoad.bind(this)} />
                </div>
                <div className="b-main-page__offers-list">
                    <OffersList data={this.state.offersData} />
                </div>
            </section>
        );
    }

}

export default MainPage;
