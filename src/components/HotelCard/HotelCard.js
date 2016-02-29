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
                        <div className='HotelInfo__photos'>
                            <img className="HotelInfo__photos-photo" src={data.HotelPhoto180}/>
                        </div>
                        <div className='HotelInfo__text'>
                            <div className='HotelInfo__text-rating'>
                                <HotelStars data={data.Stars}/>
                            </div>
                            <h2 className='HotelInfo__text-title'>
                                <div className='HotelInfo__text-title-inset'>
                                    {data.HotelName}
                                </div>
                            </h2>
                            <div className='HotelInfo__text-date'>
                                с {dateToDDMMM(checkIn)} по {dateToDDMMM(checkOut)},
                                {`${data.NightCount} ${pluralize(data.NightCount, ['ночь', 'ночи', 'ночей'])}`}
                            </div>
                            <div className='HotelInfo__text-meal'>
                                {this.getMealNameByCode(data.MealCode)} ({data.MealCode})
                            </div>
                            <div className='HotelInfo__text-rating-ta'>
                                <Tripadvisor data={{TaCommentCount: data.TaCommentCount, TaFactor: data.TaFactor}}/>
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
