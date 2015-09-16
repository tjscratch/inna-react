import React, { PropTypes } from 'react';
import styles from './AviaCard.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class AviaCard extends React.Component {
    constructor(props) {
        super(props);
    }

    getTransporterLogo(etap) {
        if (etap && etap.TransporterLogo) {
            var logo = etap.TransporterLogo;
            return `https://s.inna.ru/Files/logo/${logo}.png`;
        }

        return '';
    }

    renderTransporterInfo() {
        if (this.props.data) {
            var data = this.props.data.EtapsTo[0];
            return (
                <div className="b-aircompany">
                    <img alt="logo" className="b-aircompany__logo"
                         src={this.getTransporterLogo(data)}/>
                    <div className="b-aircompany__text">{data.TransporterName}</div>

                    <div className="b-aircompany__ico">

                    </div>
                </div>
            );
        }

        return null;
    }

    render() {
        return (
            <div className="b-avia-card">
                <div className="b-avia-card__aircompany">
                    {this.renderTransporterInfo()}
                </div>
                <div className="b-avia-card__flight-info">
                </div>
                <div className="b-avia-card__actions">
                </div>
            </div>
        );
    }
}

export default AviaCard;