import React, { PropTypes } from 'react';
import styles from './HotelCard.scss';
import withStyles from '../../decorators/withStyles';

import Tripadvisor from '../Tripadvisor';

import { apiDateToJsDate, dateToDDMMM } from '../../core/DateHelper.js';
import { pluralize } from '../../core/CountHelper.js';

@withStyles(styles) class HotelCard extends React.Component {
    constructor(props) {
        super(props);
    }

    getMealNameByCode(code) {
        switch (code) {
            case 'RO':
                return 'Без питания';
            case 'BB':
                return 'Завтрак';
            case 'HB':
                return 'Полупансион';
            case 'FB':
                return 'Полный пансион';
            case 'AI':
                return 'Все включено';
        }
    }

    render() {
        console.log('HotelCard data', this.props.data);
        var data = this.props.data;

        if (data) {
            var stars = [];
            for (let i = 0; i < data.Stars; i++) {
                stars.push(i);
            }
            var checkIn = apiDateToJsDate(data.CheckIn);
            var checkOut = apiDateToJsDate(data.CheckOut);

            return (
                <div className="b-hotel-card">
                    <div className="b-hotel-card__icon">
                        <img alt="logo" className="" src={require('./hotel.png')}/>
                    </div>
                    <div className="b-hotel-card__photo">
                        <img className="b-hotel-card-photo" src={data.HotelPhoto180}/>
                    </div>
                    <div className="b-hotel-card__info">
                        <div className="b-hotel-card-info">
                            <div className="b-hotel-card-info__stars">
                                {stars.map((item, ix)=>(<i key={ix} className="b-hotel-star icon-emb-star"></i>))}
                            </div>
                            <div className="b-hotel-card-info__title">
                                <a href="">{data.HotelName}</a>
                            </div>
                            <div className="b-hotel-card-info__map">
                                <a href="">(на карте)</a>
                            </div>
                            <div className="b-hotel-card-info__date">
                                с {dateToDDMMM(checkIn)} по {dateToDDMMM(checkOut)},
                                <br />{`${data.NightCount} ${pluralize(data.NightCount, ['ночь', 'ночи', 'ночей'])}`},&nbsp;
                                {this.getMealNameByCode(data.MealCode)} ({data.MealCode})
                            </div>
                            <div className="b-hotel-card-info__room">
                            </div>
                            <div className="b-hotel-card-info__include">
                            </div>
                            <div className="b-hotel-card-info__votes">
                                <Tripadvisor data={{TaCommentCount: data.TaCommentCount, TaFactor: data.TaFactor}} />
                            </div>
                        </div>
                    </div>
                    <div className="b-hotel-card__actions">
                        <div className="b-hotel-card-actions">
                            Еще 189 вариантов отелей
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }
}

export default HotelCard;