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
                    <div className="Slider-img" style={{backgroundImage: 'url(images/bg-1.jpg)'}}></div>
                    <div className="Slider-img" style={{backgroundImage: 'url(images/bg-2.jpg)'}}></div>
                    <div className="Slider-img" style={{backgroundImage: 'url(images/bg-3.jpg)'}}></div>
                </Slider>
            </div>
        );
    }

}

export default OffersSlider;
