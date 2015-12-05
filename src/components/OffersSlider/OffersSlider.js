import React, { PropTypes } from 'react';
import styles from './OffersSlider.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import Slider from 'react-slick';

@withViewport
@withStyles(styles) class OffersSlider extends React.Component {

    render() {
        var height = this.props.viewport.height;
        var settings = {
            dots: false,
            arrows: false,
            infinite: false,
            speed: 1500,
            easing: 0.9,
            fade: true,
            slidesToShow: 1,
            autoplay: true,
            centerMode: true,
            draggable: false,
            //lazyLoad: true
        };
        return (
            <div className="b-offers-slider" style={{height: height + 'px'}}>
                <Slider {...settings}>
                    <div className="Slider-img" style={{backgroundImage: 'url(images/bg-1.jpg)'}}>
                        <div className="Slider-caption">
                            <div className="Slider-caption__title">
                                Камчатский край
                            </div>
                            <div className="Slider-caption__text">
                                <a href="#">10 причин посетить Камчатку</a>
                            </div>
                            <div className="Slider-caption__text">
                                Туры в Камчатский край от
                                <div className="btn btn-orange">
                                    25 000 руб.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Slider-img" style={{backgroundImage: 'url(images/bg-2.jpg)'}}>
                        <div className="Slider-caption">
                            <div className="Slider-caption__title">
                                Озеро Байкал
                            </div>
                            <div className="Slider-caption__text">
                                <a href="#">10 причин посетить Камчатку</a>
                            </div>
                            <div className="Slider-caption__text">
                                Туры в Камчатский край от
                                <div className="btn btn-orange">
                                    25 000 руб.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Slider-img" style={{backgroundImage: 'url(images/bg-3.jpg)'}}>
                        <div className="Slider-caption">
                            <div className="Slider-caption__title">
                                Вологда
                            </div>
                            <div className="Slider-caption__text">
                                <a href="#">10 причин посетить Камчатку</a>
                            </div>
                            <div className="Slider-caption__text">
                                Туры в Камчатский край от
                                <div className="btn btn-orange">
                                    25 000 руб.
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }

}

export default OffersSlider;
