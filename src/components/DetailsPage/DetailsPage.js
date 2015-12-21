import React, { PropTypes } from 'react';
import styles from './DetailsPage.scss';
import withStyles from '../../decorators/withStyles';
import OffersSlider from '../OffersSlider';
import OffersList from '../OffersList';
import SearchForm from '../SearchForm';
import {PhotoSwipe, PhotoSwipeGallery} from 'react-photoswipe';
import api from './../../core/ApiClient';
import withViewport from '../../decorators/withViewport';

import { urlToInnaSearch } from '../../helpers/innaUrl.Helper';

@withViewport
@withStyles(styles)
class DetailsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            locationId: null,
            title: null,
            review: null,
            streetAddress: null,
            telephone: null,
            email: null,
            url: null,
            isOpen: false,
            price: 0,
            galleryItems: [
                {
                    src: 'http://lorempixel.com/1200/900/nightlife/1',
                    thumbnail: 'http://lorempixel.com/120/90/nightlife/1',
                    w: 1200,
                    h: 900,
                    title: 'Image 1'
                }
            ],
            options: {}
        }
    }

    getName(name) {
        //console.log('name', name);
        name = name.replace(/&amp;quot;/g, '\"');
        name = name.replace(/&amp;amp;quot;/g, '\"');
        return name;
    }

    componentDidMount() {

        var { width, height } = this.props.viewport;

        api.localGet('/api/getObjects', {itemIds: this.props.id})
            .then((data)=> {

                let item = data.items[0];

                console.log(item)

                let photos = []
                for (var i = 0; i < item.photos.length; i++) {
                    photos.push({
                        src: item.photos[i].file.$t,
                        thumbnail: item.photos[i].file.$t,
                        w: 1200,
                        h: 900,
                        title: item.photos[i].file.name
                    })
                }

                this.setState({
                    id: item.id,
                    locationId: item.locationId,
                    title: this.getName(item.name),
                    review: item.review,
                    streetAddress: item.streetAddress,
                    telephone: item.telephone,
                    email: item.email,
                    url: item.url,
                    price: item.price ? Math.ceil(item.price / 2) : null,
                    galleryItems: photos,
                });
            })
    }

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };


    openPhotoSwipe = (e) => {
        e.preventDefault();
        this.setState({
            isOpen: true,
            options: {
                closeOnScroll: true
            }
        });
    };

    handleClose = () => {
        this.setState({
            isOpen: false
        });
    };

    getThumbnailContent = (item) => {
        return (
            <img src={item.thumbnail} with={150} height={110}/>
        );
    };


    goBuy(url) {
        //window.location = url;
        window.open(url, '_blank')
    }

    renderBuy() {
        if (this.state.price && this.state.id != 292901) {
            return (
                <div className="b-details-head__buy">
                    <div className="b-details-head__buy-d">Перелет + Отель</div>
                    <div className="btn btn-orange" onClick={this.goBuy.bind(this, urlToInnaSearch(this.state.locationId))}>
                        от {this.state.price} руб (за чел.)
                    </div>
                </div>
            )
        }
        if (this.state.id == 292901) {
            return (
                <div className="b-details-head__buy">
                    <div className="b-details-head__buy-d">Перелет + Отель</div>
                    <div className="btn btn-orange" onClick={this.goBuy.bind(this, urlToInnaSearch(6196))}>от 30 194 руб (за чел.)</div>
                </div>
            )
        }
    }

    render() {
        let title = 'BookInna';
        this.context.onSetTitle(title);
        return (
            <section className="b-main-page b-main-page__details">
                <div className="b-main-page__slider">
                    <SearchForm/>
                </div>
                <div className="b-details">

                    <div className="b-details-head">

                        <div className="b-details-head__info">
                            <h1 className="b-details-head__title">
                                {this.state.title}
                            </h1>
                            {this.state.streetAddress ? <div>Адрес: <b>{this.state.streetAddress}</b></div> : null}
                            {this.state.telephone ? <div>Телефон: <b dangerouslySetInnerHTML={{__html:this.state.telephone}}></b></div> : null}
                            {this.state.email ? <div>Email: <b>{this.state.email}</b></div> : null}
                            {this.state.url ? <div>Сайт: <a href={this.state.url} target="_blank">{this.state.url}</a></div> : null}
                            {this.renderBuy()}
                        </div>

                    </div>

                    <h2 className="b-details-gallery__title">{this.state.title} - фото</h2>
                    <PhotoSwipeGallery items={this.state.galleryItems} thumbnailContent={this.getThumbnailContent.bind(this)}/>

                </div>
            </section>
        );
    }

}

export default DetailsPage;
