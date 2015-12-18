import React, { PropTypes } from 'react';
import styles from './OffersList.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import { urlToInnaSearch } from '../../helpers/innaUrl.Helper';

@withStyles(styles) class OffersList extends React.Component {
    constructor(props) {
        super(props);
        //console.log('offers props', props);
    }

    getFullUrl(url) {
        //if (url && url.startsWith('/#/')) {
        //    url = 'https://inna.ru' + url;
        //}
        //return url;
        window.location = `/details/${url}`;
    }

    goBuy(url) {
        //window.location = url;
        window.open(url, '_blank')
    }

    renderOfferTitle(offer) {
        //console.log(offer.locationId);
        let url = `/details/${offer.id}`;
        let innaUrl = urlToInnaSearch(offer.locationId);

        //let html = '';
        //html += offer.FrontTitleRow1 ? `<div class="b-offer-title__text"><a href=${url}>${offer.FrontTitleRow1}</a></div>` : '';
        //html += offer.FrontTitleRow2 ? `<div class="b-offer-title__text"><a href=${url}>${offer.FrontTitleRow2}</a></div>` : '';
        //html += offer.FrontSubTitleRow1 ? `<div class="b-offer-title__date">${offer.FrontSubTitleRow1}</div>` : '';
        //html += offer.FrontSubTitleRow2 ? `<div class="b-offer-title__date">${offer.FrontSubTitleRow2}</div>` : '';
        //html += offer.price ? `<div class="b-offer-title__sub-text">Перелет + Отель</div>` : '';
        //html += offer.price ? `<a class="btn btn-orange" href=${innaUrl} target="_blank">от ${offer.price} руб (за чел.)</a>` : '';

        //onClick={Link.handleClick}

        function getName(name) {
            //console.log('name', name);
            name = name.replace(/&amp;quot;/g, '\"');
            name = name.replace(/&amp;amp;quot;/g, '\"');
            return name;
        }

        return (
            <div className="b-offer-title-wrap">
                <a className="b-offer-link" href={url}></a>

                <div className="b-offer-title">
                    <div className="b-offer-title__text"><a href={url} dangerouslySetInnerHTML={{__html:getName(offer.name)}}></a></div>
                    <div className="b-offer-title__date">
                        {offer.regionName}
                    </div>
                    {
                        offer.price ?
                            <div className="b-offer-title__sub-text">Перелет + Отель</div>
                            : null
                    }
                    {
                        offer.price ?
                            <a className="btn btn-orange" href={innaUrl} target="_blank">от {Math.trunc(offer.price/2)} руб (за чел.)</a>
                            : null
                    }
                </div>
            </div>
        );

        //return (
        //    <div className="b-offer-title-wrap">
        //        <a className="b-offer-link" href={url}></a>
        //
        //        <div className="b-offer-title" dangerouslySetInnerHTML={{__html:html}}>
        //        </div>
        //    </div>
        //);
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

    renderSections(sections) {
        return (
            <div>
                {sections.map((section, index)=> {
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
        //берем из массива данных первый элемент
        let { data } = this.props;

        if (data) {
            var sections = data[0].SectionLayouts;

            if (sections) {
                return (
                    <div id="offersList" className="b-offers-list">
                        {this.renderSections(sections)}
                    </div>
                );
            }
        }

        return null;
    }

}

export default OffersList;
