import React, { PropTypes } from 'react';
import api from './../../core/ApiClient';
import styles from './OffersList.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class OffersList extends React.Component {
    constructor(props) {
        super(props);
        //console.log('props', props);

        //берем из массива данных первый элемент
        let data = (props.data && props.data.length > 0) ? props.data[0] : null;
        if (data && data.SectionLayouts && data.SectionLayouts.length > 0) {
            //console.log('data', data.SectionLayouts);
            this.state = {
                sections: data.SectionLayouts
            };
        }
        else {
            this.state = {
                sections: null
            };
        }
    }

    renderOffer(offer, ix) {
        //console.log(offer.OfferLayoutType, offer);
        switch (offer.OfferLayoutType) {
            case 'XL':
                return (
                    <div key={ix} className="b-offer">
                        <div className="b-offer-x-large">
                            <img className="b-offer__img" src={offer.Offer1.Image}/>
                            <div className="b-offer__title">
                                {offer.Offer1.FrontTitleRow1}
                            </div>
                        </div>
                    </div>
                );

            case 'L2S':
                return (
                    <div key={ix} className="b-offer">
                        <div className="b-offer-large offer-left">
                            <img className="b-offer__img" src={offer.Offer1.Image}/>
                            <div className="b-offer__title">
                                {offer.Offer1.FrontTitleRow1}
                            </div>
                        </div>
                        <div className="b-offer-small">
                            <img className="b-offer__img" src={offer.Offer2.Image}/>
                            <div className="b-offer__title">
                                {offer.Offer2.FrontTitleRow1}
                            </div>
                        </div>
                        <div className="b-offer-small">
                            <img className="b-offer__img" src={offer.Offer3.Image}/>
                            <div className="b-offer__title">
                                {offer.Offer3.FrontTitleRow1}
                            </div>
                        </div>
                    </div>
                );

            case '2SL':
                return (
                    <div key={ix} className="b-offer">
                        <div className="b-offer-large offer-right">
                            <img className="b-offer__img" src={offer.Offer3.Image}/>
                            <div className="b-offer__title">
                                {offer.Offer3.FrontTitleRow1}
                            </div>
                        </div>
                        <div className="b-offer-small">
                            <img className="b-offer__img" src={offer.Offer1.Image}/>
                            <div className="b-offer__title">
                                {offer.Offer1.FrontTitleRow1}
                            </div>
                        </div>
                        <div className="b-offer-small">
                            <img className="b-offer__img" src={offer.Offer2.Image}/>
                            <div className="b-offer__title">
                                {offer.Offer2.FrontTitleRow1}
                            </div>
                        </div>
                    </div>
                );

            case '2M':
                return (
                    <div key={ix} className="b-offer">
                        <div className="b-offer-medium b-offer-margin">
                            <img className="b-offer__img" src={offer.Offer1.Image}/>
                            <div className="b-offer__title">
                                {offer.Offer1.FrontTitleRow1}
                            </div>
                        </div>
                        <div className="b-offer-medium">
                            <img className="b-offer__img" src={offer.Offer2.Image}/>
                            <div className="b-offer__title">
                                {offer.Offer2.FrontTitleRow1}
                            </div>
                        </div>
                    </div>
                );

            case 'L3L3L3':
                return (
                    <div key={ix} className="b-offer">
                        <div className="b-offer-small b-offer-margin">
                            <img className="b-offer__img" src={offer.Offer1.Image}/>
                            <div className="b-offer__title">
                                {offer.Offer1.FrontTitleRow1}
                            </div>
                        </div>
                        <div className="b-offer-small b-offer-margin">
                            <img className="b-offer__img" src={offer.Offer2.Image}/>
                            <div className="b-offer__title">
                                {offer.Offer2.FrontTitleRow1}
                            </div>
                        </div>
                        <div className="b-offer-small">
                            <img className="b-offer__img" src={offer.Offer3.Image}/>
                            <div className="b-offer__title">
                                {offer.Offer3.FrontTitleRow1}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
                //return (
                //    <div key={ix}>{offer.OfferLayoutType}
                //        &nbsp;{offer.Offer1.FrontTitleRow1}
                //        &nbsp;{offer.Offer2 ? offer.Offer2.FrontTitleRow1 : ''}
                //        &nbsp;{offer.Offer3 ? offer.Offer3.FrontTitleRow1 : ''}
                //    </div>
                //);
        }
    }

    renderStaticMockup() {
        return (
            <div className="b-offer-container">
                <div className="b-offer b-offer-x-large"></div>

                <div className="b-offer b-offer-large"></div>
                <div className="b-offer b-offer-small"></div>
                <div className="b-offer b-offer-small"></div>

                <div className="b-offer b-offer-small"></div>
                <div className="b-offer b-offer-small"></div>
                <div className="b-offer b-offer-large"></div>

                <div className="b-offer b-offer-x-large"></div>

                <div className="b-offer b-offer-medium"></div>
                <div className="b-offer b-offer-medium"></div>

                <div className="b-offer b-offer-x-large"></div>

                <div className="b-offer b-offer-large"></div>
                <div className="b-offer b-offer-small"></div>
                <div className="b-offer b-offer-small"></div>

                <div className="b-offer b-offer-small"></div>
                <div className="b-offer b-offer-small"></div>
                <div className="b-offer b-offer-small"></div>

                <div className="b-offer b-offer-x-large"></div>

                <div className="b-offer b-offer-medium"></div>
                <div className="b-offer b-offer-medium"></div>
            </div>
        );
    }

    renderSections() {
        var self = this;
        return (
            <div>
                {this.state.sections.map((section, index)=> {
                    return (
                        <div key={index}>
                            {section.OfferLayouts.map(self.renderOffer)}
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        if (this.state.sections) {
            return (
                <div id="offersList" className="b-offers-list">
                    {this.renderSections()}
                </div>
            );
        }
        else {
            return null;
        }
    }

}

export default OffersList;
