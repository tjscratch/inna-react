import React, { PropTypes, Component } from 'react';
import styles from './VisaAlert.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class VisaAlert extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="b-visa-alert">
                <div className="b-visa-alert__img">
                    <img className="b-visa-alert-img" src={require('./visa-alert.png')} />
                </div>
                <div className="b-visa-alert__img-mobile icon-emb-attention">
                    &nbsp;
                </div>
                <div className="b-visa-alert__text">
                    <div className="b-visa-alert__head">Обратите внимание</div>
                    <div className="b-visa-alert__body">Требуется виза. Рекомендуем ознакомиться с визовыми правилами для посещения стран:&nbsp;
                        <span>Швейцария,&nbsp;</span>
                        <a className="b-visa-alert-link" href="#">Германия.</a>
                    </div>
                </div>
            </div>
        );
    }

}

export default VisaAlert;
