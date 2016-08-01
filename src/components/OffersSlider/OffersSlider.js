import React, { PropTypes, Component } from 'react';
import styles from './OffersSlider.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class OffersSlider extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        let data = this.props.data;
        let altImage = data.countryName + ' ' + data.tittle + ' ' + data.description;

        return (
            <div className="OffersSlider">
                <img className="OffersSlider__img" src={ data.srcImage } alt={ altImage }/>
                <div className="OffersSlider__content">
                    <div className="content__main-slogan">
                      <div className="main-slogan__country-name">{ data.countryName }</div>
                      <div className="main-slogan__tittle">{ data.tittle }</div>
                      <div className="main-slogan__description">{ data.description }</div>
                    </div>
                    <div className="content__slogan">
                      {data.slogan.map((item, ix) => {
                        return (
                          <div className="slogan" key={ix}>
                            <div className="slogan__tittle">{ item.tittle }</div>
                            <div className="slogan__description" dangerouslySetInnerHTML={{__html: item.description }}></div>
                          </div>
                        )
                      })}
                    </div>
                </div>
            </div>
        );
    }

}

export default OffersSlider;
