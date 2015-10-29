import React, { PropTypes } from 'react';
import styles from './HotelDetailsRooms.scss';
import withStyles from '../../decorators/withStyles';

//helpers
import { stripTags } from '../../core/HtmlHelper.js';

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
        var roomAmenities = room ? room.RoomAmenities : null;

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

    renderRoom(room, ix) {
        var photos = room ? room.Photos : null;
        var photo = photos ? photos.BaseUrl : null;

        var description = stripTags(room.Description);
        var extra = room.Extra;

        return (
            <div key={ix} className="b-rooms-list-item">
                <div className="b-rooms-list-item__info" onClick={()=>{this.toggleDescription(room)}}>
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
                <div className="b-rooms-list-item__price">
                </div>
                <div className="b-rooms-list-item__buy">
                </div>
                <div
                    className={`b-rooms-list-item__description ${room.expanded ? 'b-rooms-list-item__description_expanded' : ''}`}>
                    <div dangerouslySetInnerHTML={{__html: description}}></div>
                    {this.renderExtra(room)}
                    {this.renderAmenities(room)}
                </div>
            </div>
        )
    }

    render() {
        var rooms = this.state.rooms;

        if (rooms) {

            //debug
            //var rm = rooms[0];
            //rm.Extra.Huil = {
            //    CategoryName: "Без хуяния",
            //    List: ["Без хуяния"]
            //};

            //console.log(rooms[0]);
            return (
                <div className="b-hotel-details-rooms">
                    <div className="b-hotel-details-rooms__title">Выбор номера</div>
                    <div className="b-hotel-details-rooms__list">
                        <div className="b-rooms-list">
                            {
                                rooms.map((room, ix)=> {
                                    return this.renderRoom(room, ix);
                                }, this)
                            }
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }

}

export default HotelDetailsRooms;
