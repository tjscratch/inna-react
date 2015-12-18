import React, { PropTypes } from 'react';
import styles from './OffersSlider.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import Slider from 'react-slick';

import { urlToInnaSearch } from '../../helpers/innaUrl.Helper';

@withViewport
@withStyles(styles) class OffersSlider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            height: this.props.viewport.height
        };
    }

    static propTypes = {
        viewport: PropTypes.shape({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired
        }).isRequired
    };

    goBuy(url) {
        //window.location = url;
        window.open(url, '_blank')
    }

    render() {
        let { width, height } = this.props.viewport;
        this.renderCss(`.b-offers-slider {height:${height}px;}.slick-track {height:${height}px;}`);
        
        var settings = {
            dots: false,
            arrows: false,
            infinite: false,
            speed: 2000,
            easing: 0.9,
            fade: true,
            slidesToShow: 1,
            autoplay: true,
            centerMode: true,
            draggable: false,
            //lazyLoad: true
        };
        return (
            <div className="b-offers-slider">
                <Slider {...settings}>
                    <div className="Slider-img" style={{backgroundImage: 'url(/images/bg-4.jpg)'}}>
                        <div className="Slider-caption">
                            <div className="Slider-caption__title">
                                <a href="/details/16615">Горнолыжный курорт "Чегет"</a>
                            </div>
                            <div className="Slider-caption__text">
                                Перелет + Отель
                                <div className="btn btn-orange" onClick={this.goBuy.bind(this, urlToInnaSearch(2300))}>от 11 847 руб (за чел.)</div>
                            </div>
                        </div>
                    </div>
                    <div className="Slider-img" style={{backgroundImage: 'url(/images/bg-5.jpg)'}}>
                        <div className="Slider-caption">
                            <div className="Slider-caption__title">
                                <a href="/details/292901">Горнолыжный курорт "Шерегеш"</a>
                            </div>
                            <div className="Slider-caption__text">
                                Перелет + Отель
                                <div className="btn btn-orange" onClick={this.goBuy.bind(this, urlToInnaSearch(6196))}>от 30 194 руб (за чел.)</div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }

}

export default OffersSlider;
