import React, { PropTypes } from 'react';
import api from './../../core/ApiClient';
import styles from './OffersList.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

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

    getFullUrl(url) {
        if (url && url.startsWith('/#/')) {
            url = 'https://inna.ru' + url;
        }
        return url;
    }

    renderOfferTitle(offer) {
        //console.log('renderOfferTitle', offer);

        let html = '';
        html += offer.FrontTitleRow1 ? `<div class="b-offer-title__text">${offer.FrontTitleRow1}</div>` : '';
        html += offer.FrontTitleRow2 ? `<div class="b-offer-title__text">${offer.FrontTitleRow2}</div>` : '';
        html += offer.FrontSubTitleRow1 ? `<div class="b-offer-title__date">${offer.FrontSubTitleRow1}</div>` : '';
        html += offer.FrontSubTitleRow2 ? `<div class="b-offer-title__date">${offer.FrontSubTitleRow2}</div>` : '';
        html += offer.BackSubTitleRow2 ? `<div class="b-offer-title__sub-text">${offer.BackSubTitleRow2}</div>` : '';
        html += offer.FrontPrice ? `<div>от <span class="b-offer-title__price">${offer.FrontPrice}<span/></div>` : '';

        //onClick={Link.handleClick}
        return (
            <a className="b-offer-title-wrap" href={this.getFullUrl(offer.Url)}>
                <div className="b-offer-title" dangerouslySetInnerHTML={{__html:html}}>
                </div>
            </a>
        );
    }

    renderOffer(offer, ix) {
        //console.log(offer.OfferLayoutType, offer);

        //offer.Offer1.Image = null;
        //if (offer.Offer2) offer.Offer2.Image = null;
        //if (offer.Offer3) offer.Offer3.Image = null;

        switch (offer.OfferLayoutType) {
            case 'XL':
                return (
                    <div key={ix} className="b-offer">
                        <div className="b-offer-x-large" style={{backgroundImage: `url('${offer.Offer1.Image}')`}}>
                            {this.renderOfferTitle(offer.Offer1)}
                        </div>
                    </div>
                );

            case 'L2S':
                return (
                    <div key={ix} className="b-offer">
                        <div className="b-offer-large offer-left"
                             style={{backgroundImage: `url('${offer.Offer1.Image}')`}}>
                            {this.renderOfferTitle(offer.Offer1)}
                        </div>
                        <div className="b-offer-small" style={{backgroundImage: `url('${offer.Offer2.Image}')`}}>
                            {this.renderOfferTitle(offer.Offer2)}
                        </div>
                        <div className="b-offer-small" style={{backgroundImage: `url('${offer.Offer3.Image}')`}}>
                            {this.renderOfferTitle(offer.Offer3)}
                        </div>
                    </div>
                );

            case '2SL':
                return (
                    <div key={ix} className="b-offer">
                        <div className="b-offer-large offer-right"
                             style={{backgroundImage: `url('${offer.Offer3.Image}')`}}>
                            {this.renderOfferTitle(offer.Offer3)}
                        </div>
                        <div className="b-offer-small" style={{backgroundImage: `url('${offer.Offer1.Image}')`}}>
                            {this.renderOfferTitle(offer.Offer1)}
                        </div>
                        <div className="b-offer-small" style={{backgroundImage: `url('${offer.Offer2.Image}')`}}>
                            {this.renderOfferTitle(offer.Offer2)}
                        </div>
                    </div>
                );

            case '2M':
                return (
                    <div key={ix} className="b-offer">
                        <div className="b-offer-medium b-offer-margin"
                             style={{backgroundImage: `url('${offer.Offer1.Image}')`}}>
                            {this.renderOfferTitle(offer.Offer1)}
                        </div>
                        <div className="b-offer-medium" style={{backgroundImage: `url('${offer.Offer2.Image}')`}}>
                            {this.renderOfferTitle(offer.Offer2)}
                        </div>
                    </div>
                );

            case 'L3L3L3':
                return (
                    <div key={ix} className="b-offer">
                        <div className="b-offer-small b-offer-margin"
                             style={{backgroundImage: `url('${offer.Offer1.Image}')`}}>
                            {this.renderOfferTitle(offer.Offer1)}
                        </div>
                        <div className="b-offer-small b-offer-margin"
                             style={{backgroundImage: `url('${offer.Offer2.Image}')`}}>
                            {this.renderOfferTitle(offer.Offer2)}
                        </div>
                        <div className="b-offer-small" style={{backgroundImage: `url('${offer.Offer3.Image}')`}}>
                            {this.renderOfferTitle(offer.Offer3)}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    }

    renderSections() {
        return (
            <div>
                {this.state.sections.map((section, index)=> {
                    return (
                        <div key={index}>
                            {section.OfferLayouts.map(this.renderOffer, this)}
                        </div>
                    );
                }, this)}
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
