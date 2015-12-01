import React, { PropTypes } from 'react';
import styles from './Tripadvisor.scss';
import withStyles from '../../decorators/withStyles';

import { pluralize } from '../../helpers/CountHelper.js';

@withStyles(styles) class Tripadvisor extends React.Component {
    constructor(props) {
        super(props);
    }

    getTaFactorArray(taFactor) {
        var result = [];
        //округляем до меньшего целого (3.5 -> 3)
        for (let i = 1; i <= Math.floor(taFactor); i++) {
            result.push(1);//целый круг
        }
        //если осталось дробное - то добавляем половину звезды
        if (taFactor - Math.floor(taFactor) >= 0.5) {
            result.push(0);//половинка
        }
        return result;
    }

    render() {
        var data = this.props.data ? this.props.data : null;

        if (data) {
            var taFactor = this.getTaFactorArray(data.TaFactor);

            return (
                <div className="b-tripadvisor-votes">
                    <div className="b-tripadvisor-stars-wrap">
                        <img className="b-tripadvisor-votes__img" src={require('./tripadvisor.png')}/>
                        {taFactor.map((item, ix)=> {
                            if (item == 1) {
                                return (<img key={ix} className="b-tripadvisor-votes__star"
                                             src={require('./tripadvisor-like.png')}/>)
                            }
                            else {
                                return (<img key={ix} className="b-tripadvisor-votes__star"
                                             src={require('./tripadvisor-half.png')}/>)
                            }
                        })}
                    </div>
                    <div className="b-tripadvisor-votes__count">{data.TaCommentCount} {pluralize(data.TaCommentCount, ['отзыв','отзыва','отзывов'])}</div>
                </div>
            );
        }

        return null;
    }
}

export default Tripadvisor;