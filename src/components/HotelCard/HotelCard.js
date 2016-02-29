import React, { PropTypes } from 'react';
import styles from './HotelCard.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

import Tripadvisor from '../Tripadvisor';

import { apiDateToJsDate, dateToDDMMM } from '../../helpers/DateHelper.js';
import { pluralize } from '../../helpers/CountHelper.js';

import ListType from '../PackagesSearchResultsPage/ListType.js';
import HotelStars from '../HotelStars';
import ButtonSecondary from '../ui/Buttons/ButtonSecondary/ButtonSecondary.js'

@withViewport
@withStyles(styles)
class HotelCard extends React.Component {
    constructor (props) {
        super(props);
    }

    getMealNameByCode (code) {
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

    actionClick () {
        var { events } = this.props;
        if (events && events.changeListType) {
            events.changeListType(ListType.Hotels);
        }
    }

    renderActions () {
        var { data, showChangeHotels, viewport } = this.props;
        if (data) {
            //сейчас выбраны авиабилеты - показываем кнопку переключения на пакеты
            //if (viewport.isMobile || showChangeHotels) {
            if (showChangeHotels) {
                return (
                    <div className="b-hotel-card__actions">
                        {
                            data.HotelsCount ?
                                <ButtonSecondary onClick={this.actionClick.bind(this)}>
                                    Еще {data.HotelsCount} {pluralize(data.HotelsCount, ['отеля', 'отелей', 'отелей'])}
                                </ButtonSecondary>
                                :
                                <ButtonSecondary onClick={this.actionClick.bind(this)}>
                                    Заменить отель
                                </ButtonSecondary>
                        }
                        <ButtonSecondary ButtonType='Link' onClick={(e)=>{this.ticketAbout(e)}}>
                            Подробнее
                        </ButtonSecondary>
                    </div>
                );
            }
            else {
                return (
                    <div className="b-hotel-card__actions b-hotel-card__actions-more">
                        <ButtonSecondary ButtonType='Link' onClick={(e)=>{this.ticketAbout(e)}}>
                            Подробнее
                        </ButtonSecondary>
                    </div>
                );
            }
        }

        return null;
    }

    render () {
        //console.log('HotelCard data', this.props.data);
        var { data, allowActions } = this.props;

        if (data) {
            var checkIn = apiDateToJsDate(data.CheckIn);
            var checkOut = apiDateToJsDate(data.CheckOut);

            return (
                <div className="b-hotel-card">
                    <div className='HotelInfo'>
                        <div className="b-hotel-card__photo">
                            <img className="b-hotel-card-photo" src={data.HotelPhoto180}/>
                        </div>
                        <div className="b-hotel-card__info">
                            <div className="b-hotel-card-info">
                                <div className="b-hotel-card-info__stars">
                                    <HotelStars data={data.Stars}/>
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
                                    <Tripadvisor data={{TaCommentCount: data.TaCommentCount, TaFactor: data.TaFactor}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {allowActions ? this.renderActions() : null}
                </div>
            );
        }

        return null;
    }
}

export default HotelCard;
