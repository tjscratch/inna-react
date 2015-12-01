import React, { PropTypes, Component } from 'react';
import styles from './TarifsDescription.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class TarifsDescription extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="b-tarifs-description">
                <div>Внимание! К компонентам пакета применяются разные условия отмены бронирования.</div>
                <div>
                    Пожалуйста, ознакомьтесь с&nbsp;
                    <a className="b-tarifs-description-link" href="#">правилами применения тарифа авиабилета</a>
                    &nbsp;и&nbsp;
                    <a className="b-tarifs-description-link" href="#">условиями бронирования отеля</a>
                    &nbsp;и&nbsp;
                    <a className="b-tarifs-description-link" href="#">правилами медицинского страхования.</a>
                </div>
            </div>
        );
    }

}

export default TarifsDescription;
