import React, { PropTypes } from 'react';
import styles from './OffersSlider.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

@withViewport
@withStyles(styles) class OffersSlider extends React.Component {

    render() {
        var height = this.props.viewport.height;
        console.log(height)
        //console.log(this.props.viewport)
        //this.renderCss(`.b-offers-slider {height:'300px';}`);
        
        return (
            <div className="b-offers-slider" style={{height: height + 'px'}}>
                <div className="b-offers-slider__content">
                    <div>asdrser</div>
                </div>
            </div>
        );
    }

}

export default OffersSlider;
