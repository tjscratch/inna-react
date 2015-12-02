import React, { PropTypes, Component } from 'react';
import styles from './BuyRequest.scss';
import withStyles from '../../decorators/withStyles';

import BuyBtn from '../../components/ui/Buttons/BuyBtn';

@withStyles(styles) class BuyRequest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="b-buy-request">
                <div className="b-buy-request__text">
                    Если по какой то причине Вы сейчас не готовы сделать бронирование или оплатить путешествие банковской картой, или Вам нужна консультация нашего специалиста, просто сделайте заявку и наш менеджер свяжется с Вами.
                </div>
                <div className="b-buy-request__button">
                    <BuyBtn text="Отправить заявку" onBuy={()=>this.props.onSendClick ? this.props.onSendClick() : null} />
                </div>
            </div>
        );
    }

}

export default BuyRequest;
