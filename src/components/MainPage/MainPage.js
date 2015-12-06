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
        console.log('main page onItemsLoad, item 0', data ? data.items[0]: null);
        //console.log('this.refs',this.refs);


        //OfferLayouts[0]

        //Offer1
        //Offer2
        //Offer3
        //OfferLayoutType: "L2S"

        function offersNeededByType(type) {
            switch (type) {
                case 'XL': return 1;
                case 'L2S': return 3;
                case '2SL': return 3;
                case '2M': return 2;
                case 'L3L3L3': return 3;
            }
            return null;
        }

        function getNextOfferType(type) {
            var offerTypes = ['XL','L2S','2SL','2M','L3L3L3'];
            if (type) {
                var ix = offerTypes.indexOf(type);
                var nextType = offerTypes[ix+1];

                if (!nextType) {
                    nextType = offerTypes[0];
                }
                return nextType;
            }
            else {
                return offerTypes[0];
            }
        }

        function getOfferFromData(item, data) {
            //console.log('getOfferFromData', item, data);
            return {
                id: item.id,
                locationId: item.locationId,
                price: item.price,
                Image: item.image ? item.image : (item.photos && item.photos.length > 0 ? item.photos[0].file['$t'] : ''), //item.photos[0].file['$t']
                name: item.name,
                regionName: "Брянск"
            }
        }


        if (data && data.items) {
            var origData = data;

            //берем топ 20
            data = data.items;
            data = data.filter((i)=>{
                if (i.price) {
                    return true;
                }
                return false;
            });
            data = data.splice(0,30);

            //берем тип
            var offerType = getNextOfferType();
            //сколько нужно оферов
            var itemsNeeded = offersNeededByType(offerType);
            var curIndex = -1;
            var offerLayouts = [];
            console.log('here');
            while(curIndex + itemsNeeded < data.length) {
                var offer1 = data[curIndex + 1];
                var offer2 = data[curIndex + 2];
                var offer3 = data[curIndex + 3];
                switch (offerType) {
                    case 'XL': {
                        offerLayouts.push({
                            Offer1: getOfferFromData(offer1, origData),
                            OfferLayoutType: 'XL'
                        });
                        curIndex++;
                        break;
                    }
                    case 'L2S': {
                        offerLayouts.push({
                            Offer1: getOfferFromData(offer1, origData),
                            Offer2: getOfferFromData(offer2, origData),
                            Offer3: getOfferFromData(offer3, origData),
                            OfferLayoutType: 'L2S'
                        });
                        curIndex = curIndex + 3;
                        break;
                    }
                    case '2SL': {
                        offerLayouts.push({
                            Offer1: getOfferFromData(offer1, origData),
                            Offer2: getOfferFromData(offer2, origData),
                            Offer3: getOfferFromData(offer3, origData),
                            OfferLayoutType: '2SL'
                        });
                        curIndex = curIndex + 3;
                        break;
                    }
                    case '2M': {
                        offerLayouts.push({
                            Offer1: getOfferFromData(offer1, origData),
                            Offer2: getOfferFromData(offer2, origData),
                            OfferLayoutType: '2M'
                        });
                        curIndex = curIndex + 2;
                        break;
                    }
                    case 'L3L3L3': {
                        offerLayouts.push({
                            Offer1: getOfferFromData(offer1, origData),
                            Offer2: getOfferFromData(offer2, origData),
                            Offer3: getOfferFromData(offer3, origData),
                            OfferLayoutType: 'L3L3L3'
                        });
                        curIndex = curIndex + 3;
                        break;
                    }
                }

                //new loop
                offerType = getNextOfferType(offerType);
                itemsNeeded = offersNeededByType(offerType);
            }



            //var items = data.map((item)=>{
            //    return {
            //        Offer1: {
            //            Image: item.image ? item.image : (item.photos && item.photos.length > 0 ? item.photos[0].file['$t'] : ''), //item.photos[0].file['$t']
            //            FrontTitleRow1: item.name
            //        },
            //        OfferLayoutType: 'XL'
            //    }
            //});

            var offersData = [{
                SectionLayouts: [{
                    //OfferLayouts : items
                    OfferLayouts : offerLayouts
                }]
            }]
        }


        this.setState({
            offersData: offersData
        })
    }

    render() {
        let title = 'BookInna';
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
