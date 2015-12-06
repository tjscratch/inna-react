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
        console.log('main page onItemsLoad, item 0', data[0]);
        //console.log('this.refs',this.refs);


        //OfferLayouts[0]

        //Offer1
        //Offer2
        //Offer3
        //OfferLayoutType: "L2S"


        if (data) {
            data = data.splice(0,20);
            var items = data.map((item)=>{
                return {
                    Offer1: {
                        Image: item.image ? item.image : (item.photos && item.photos.length > 0 ? item.photos[0].file['$t'] : ''), //item.photos[0].file['$t']
                        FrontTitleRow1: item.name
                    },
                    OfferLayoutType: 'XL'
                }
            });

            var offersData = [{
                SectionLayouts: [{
                    OfferLayouts : items
                }]
            }]
        }


        this.setState({
            offersData: offersData
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
