import React, { PropTypes } from 'react';
import styles from './HotelDetailsRooms.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

//helpers
import { stripTags } from '../../helpers/HtmlHelper.js';

//controls
import BuyBtn from '../ui/Buttons/BuyBtn';
import Price from '../Price';

@withViewport
@withStyles(styles) class HotelDetailsRooms extends React.Component {
    constructor(props) {
        super(props);

        var rooms = props.data;
        this.state = {
            rooms: rooms
        };
    }

    componentWillReceiveProps(props) {
        var rooms = props.data;
        this.setState({
            rooms: rooms
        })
    }

    toggleDescription(room) {
        if (room) {
            var isExpanded = room.expanded ? true : false;
            room.expanded = !isExpanded;

            this.setState({
                rooms: this.state.rooms
            })
        }
    }

    buyClick(room) {
        //console.log('room buyClick', room);
        var { onRoomBuyClick } = this.props;
        if (onRoomBuyClick) {
            onRoomBuyClick(room);
        }
    }

    mobileBuyClick(e, room) {
        e.preventDefault();
        e.stopPropagation();

        //console.log('room mobileBuyClick', room);
        var { viewport, onRoomBuyClick } = this.props;
        var { isMobile } = viewport;

        if (isMobile && onRoomBuyClick) {
            onRoomBuyClick(room);
        }
    }

    renderBedType(room) {
        if (room && room.BedTypeList) {
            return (
                <div className="b-rooms-list-item-bed-type-list">
                    {
                        room.BedTypeList.map((bed, ix)=> {
                            return (
                                <span key={ix}>
                                    {`${bed.Name}${ix < room.BedTypeList.length - 1 ? ', ' : ''}`}
                                </span>
                            )
                        }, this)
                    }
                </div>
            )
        }

        return null;
    }

    getExtraList(room) {
        var extraList = [];
        if (room && room.Extra) {
            for (var key in room.Extra) {
                var ex = room.Extra[key];
                extraList.push({CategoryName: ex.CategoryName, List: ex.List})
            }
            return extraList;
        }

        return null;
    }

    renderTextExtra(room) {
        var extraList = this.getExtraList(room);

        if (extraList) {
            return (
                <ul className="b-rooms-list-item-text-extra-list">
                    {
                        extraList.map((extra, ix)=> {
                            return (
                                <li key={ix} className="b-rooms-list-item-text-extra-list-item">
                                    {extra.CategoryName}
                                </li>
                            )
                        }, this)
                    }
                </ul>
            )
        }

        return null;
    }

    renderExtra(room) {
        //Extra.Meal
        //Extra.Meal.CategoryName
        //Extra.Meal.List
        var extraList = this.getExtraList(room);
        var allExtras = [];

        if (extraList) {
            extraList.map((ex, ix)=> {
                allExtras = allExtras.concat(ex.List);
            });
        }

        if (allExtras && allExtras.length > 0) {
            return (
                <div>
                    <h3>Включено в стоимость</h3>
                    {
                        allExtras.map((extra, ix)=> {
                            return (
                                <span key={ix}>
                                    {`${extra}${ix < allExtras.length - 1 ? ', ' : '.'}`}
                                </span>
                            )
                        }, this)
                    }
                </div>
            )
        }

        return null;
    }

    renderAmenities(room) {
        var roomAmenities = room && room.RoomAmenities && room.RoomAmenities.length > 0 ? room.RoomAmenities : null;

        if (roomAmenities) {
            return (
                <div>
                    <h3>Услуги</h3>
                    {
                        roomAmenities.map((am, ix)=> {
                            return (
                                <span key={ix}>
                                    {`${am.Name}${ix < roomAmenities.length - 1 ? ', ' : '.'}`}
                                </span>
                            )
                        }, this)
                    }
                </div>
            )
        }

        return null;
    }

    renderCancellationRules(room) {
        var roomCancellationRule = room ? room.CancellationRule : null;

        if (roomCancellationRule) {
            return (
                <div>
                    <h3>Правила отмены</h3>
                    {roomCancellationRule}
                </div>
            )
        }

        return null;
    }

    renderRoom(room, ix) {
        var photos = room ? room.Photos : null;
        var photo = photos ? photos.BaseUrl : null;

        var description = stripTags(room.Description);
        var extra = room.Extra;

        var packagePrice = this.props.packagePrice;
        var price = room.PackagePrice - packagePrice;

        return (
            <div key={ix} className="b-rooms-list-item">
                <div className="b-rooms-list-item__head" onClick={()=>{this.toggleDescription(room)}}>
                    <div className="b-rooms-list-item__info">
                        <div className="b-rooms-list-item-info">
                            {
                                photo ?
                                    <div className="b-rooms-list-item-info__photo">
                                        <img className="b-rooms-list-item-info-photo" src={photo}/>
                                    </div> : null
                            }

                            <div className="b-rooms-list-item-info__text">
                                <div className="b-rooms-list-item-link">{room.RoomName}</div>
                                {this.renderBedType(room)}
                                {this.renderTextExtra(room)}
                            </div>
                        </div>
                    </div>
                    <div className="b-rooms-list-item__refund">
                        {
                            room.IsRefundable && room.IsReturnsWithFine ?
                                <div className="b-rooms-list-item-refund">
                                    Отмена бронирования <br/>со штрафом
                                </div> : null
                        }
                        {
                            !room.IsRefundable ?
                                <div className="b-rooms-list-item-refund">
                                    Без возможности <br/>возврата
                                </div> : null
                        }
                    </div>
                    <div className="b-rooms-list-item__price" onClick={(e)=>this.mobileBuyClick(e, room)}>
                        <div className="b-rooms-list-item-price">
                            <div className="b-rooms-list-item-price__include">
                                {
                                    ix == 0 ? <span>Включен в цену</span>
                                        : <span>+ {price}</span>
                                }
                            </div>
                            <div className="b-rooms-list-item-price__price">
                                К оплате: <span className="b-rooms-list-item-price__price__value"><Price data={room.PackagePrice}/></span>
                            </div>
                        </div>
                    </div>
                    <div className="b-rooms-list-item__buy">
                        <BuyBtn onBuy={()=>this.buyClick(room)}/>
                    </div>
                </div>
                <div
                    className={`b-rooms-list-item__description ${room.expanded ? 'b-rooms-list-item__description_expanded' : ''}`}>
                    <div dangerouslySetInnerHTML={{__html: description}}></div>
                    {this.renderExtra(room)}
                    {this.renderAmenities(room)}
                    {this.renderCancellationRules(room)}
                </div>
            </div>
        )
    }

    render() {
        var rooms = this.state.rooms;

        return (
            <div className="b-hotel-details-rooms">
                <div className="b-hotel-details-rooms__title">Выбор номера</div>
                <div className="b-hotel-details-rooms__list">
                    {
                        rooms ?
                            <div className="b-rooms-list">
                                {
                                    rooms.map((room, ix)=> {
                                        return this.renderRoom(room, ix);
                                    }, this)
                                }
                            </div> :
                            <div>Loading...</div>
                    }
                </div>
            </div>
        );
    }
}

export default HotelDetailsRooms;
