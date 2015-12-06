import React, { PropTypes } from 'react';
import styles from './OffersList.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles) class OffersList extends React.Component {
    constructor(props) {
        super(props);
        console.log('offers props', props);
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
        //console.log('renderOfferTitle', offer);

        let html = '';
        html += offer.FrontTitleRow1 ? `<div class="b-offer-title__text"><a onClick={this.getFullUrl.bind(this, offer.id)}>${offer.FrontTitleRow1}</a></div>` : '';
        html += offer.FrontTitleRow2 ? `<div class="b-offer-title__text"><a onClick={this.getFullUrl.bind(this, offer.id)}>${offer.FrontTitleRow2}</a></div>` : '';
        html += offer.FrontSubTitleRow1 ? `<div class="b-offer-title__date">${offer.FrontSubTitleRow1}</div>` : '';
        html += offer.FrontSubTitleRow2 ? `<div class="b-offer-title__date">${offer.FrontSubTitleRow2}</div>` : '';
        html += offer.BackSubTitleRow2 ? `<div class="b-offer-title__sub-text">Перелет + Отель</div>` : '';
        html += offer.FrontPrice ? `<div className="btn btn-orange" onClick={this.goBuy.bind(this, 'https://inna.ru/#/packages/search/6733-18820-21.12.2015-27.12.2015-0-2-')}>от ${offer.FrontPrice}</div>` : '';

        //onClick={Link.handleClick}
        return (
            <div className="b-offer-title-wrap">
                <a className="b-offer-link" onClick={this.getFullUrl.bind(this, offer.id)}></a>
                <div className="b-offer-title" dangerouslySetInnerHTML={{__html:html}}>
                </div>
            </div>
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

    renderSections(sections) {
        return (
            <div>
                <div className="b-offer">
                    <div className="b-offer-large offer-left"
                         style={{backgroundImage: `url("https://s.inna.ru/Files/Photos/151030173212/151126161701/p_637x428.jpg")`}}>
                        <div className="b-offer-title-wrap">
                            <a className="b-offer-link" href="/details"></a>

                            <div className="b-offer-title">
                                <div className="b-offer-title__text">
                                    <a href="/">База отдыха «Мещерский скит»</a>
                                </div>
                                <div className="b-offer-title__date">Владимирская область / Чамерево</div>
                                <div className="b-offer-title__sub-text">Перелет + Отель</div>
                                <div className="btn btn-orange" onClick={this.goBuy.bind(this, 'https://inna.ru/#/packages/search/6733-18820-21.12.2015-27.12.2015-0-2-')}>от 6 206 руб (за чел.)</div>
                            </div>
                        </div>
                    </div>
                    <div className="b-offer-small"
                         style={{backgroundImage: `url("https://s.inna.ru/Files/Photos/151030173212/151126161701/p_637x428.jpg")`}}>
                        <div className="b-offer-title-wrap">
                            <a className="b-offer-link" href="/"></a>

                            <div className="b-offer-title">
                                <div className="b-offer-title__text">База отдыха «Мещерский скит»</div>
                                <div className="b-offer-title__date">Владимирская область / Чамерево</div>
                                <div className="b-offer-title__sub-text">Перелет + Отель</div>
                                <div className="btn btn-orange" onClick={this.goBuy.bind(this, 'https://inna.ru/#/packages/search/6733-18820-21.12.2015-27.12.2015-0-2-')}>от 6 206 руб (за чел.)</div>
                            </div>
                        </div>
                    </div>
                    <div className="b-offer-small"
                         style={{backgroundImage: `url("https://s.inna.ru/Files/Photos/151030173212/151126161701/p_637x428.jpg")`}}>
                        <div className="b-offer-title-wrap">
                            <a className="b-offer-link" href="/"></a>

                            <div className="b-offer-title">
                                <div className="b-offer-title__text">База отдыха «Мещерский скит»</div>
                                <div className="b-offer-title__date">Владимирская область / Чамерево</div>
                                <div className="b-offer-title__sub-text">Перелет + Отель</div>
                                <div className="btn btn-orange" onClick={this.goBuy.bind(this, 'https://inna.ru/#/packages/search/6733-18820-21.12.2015-27.12.2015-0-2-')}>от 6 206 руб (за чел.)</div>
                            </div>
                        </div>
                    </div>
                </div>
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
