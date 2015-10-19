import React, { PropTypes } from 'react';
import moment from 'moment';
import api from '../../core/ApiClient';
import apiUrls from '../../constants/ApiUrls.js';
import styles from './SearchForm.scss';
import withStyles from '../../decorators/withStyles';
import TabsNav from '../TabsNav';
import Suggest from '../ui/Suggest';
import DatepickerRange from '../ui/DatepickerRange';


@withStyles(styles) class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        //начальные данные для рендера на сервере
        let data = props ? props.data : null;

        //формат данных:
        /*
         fromId
         toId
         fromDate - 09.11.2015
         toDate
         flightClass
         adultCount
         childAges - опционально
         from - объект directory - опционально
         to - объект directory - опционально
         */

        //объект directory:
        /*
         Airport: Array[3]
         Basic: 1
         CodeIata: "MOW"
         CodeIcao: ""
         CodeSirena: "МОВ"
         CountryId: 189
         CountryName: "Россия"
         Id: 6733
         Name: "Москва"
         NameEn: "Moscow"
         VisaGroup: 0
         */

        if (data) {
            this.state = {
                ...data
            };
        }
        else {
            this.state = {
                fromId: null,
                toId: null,
                fromDate: null,
                toDate: null
            };
        }
    }

    //getFlightClassName() {
    //    var flightClass = this.state.flightClass;
    //    if (flightClass) {
    //        прводим к числу
    //switch (+flightClass) {
    //    case 0:
    //        return 'эконом';
    //    case 1:
    //        return 'бизнес';
    //}
    //}
    //
    //return 'эконом';
    //}

    //getPeopleCount() {
    //    var adultCount = 0;
    //    var childCount = 0;
    //
    //    if (this.state.adultCount) {
    //        adultCount = +this.state.adultCount;
    //    }
    //    var childAges = this.state.childAges;
    //    if (childAges) {
    //        let agesArray = childAges.split('_');
    //        if (agesArray) {
    //            childCount = agesArray.length;
    //        }
    //    }
    //
    //    //ToDo: прикрутить множественную форму
    //    return `${adultCount + childCount} человек`;
    //}

    locationFrom(data) {
        this.setState({
            fromId: data.Id
        });
    }

    locationTo(data) {
        this.setState({
            toId: data.Id
        });
    }


    handleStartSearch() {
        let searchParams = [
            this.state.fromId,
            this.state.toId
        ].join('-');
        window.location = `/packages/search/${searchParams}-01.10.2015-08.10.2015-0-2-2`;
    }


    setFromDate(date) {
        this.setState({
            fromDate: date
        });
    }

    setToDate(date) {
        this.setState({
            toDate: date
        })
    }

    render() {
        return (
            <section className="b-search-form">
                <div className="b-search-form__tabs">
                    <TabsNav/>
                </div>
                <div className="b-search-form__form">
                    <div>
                        fromDate - {this.state.fromDate}
                        <hr/>
                        toDate - {this.state.toDate}
                    </div>
                    <div className="b-search-form__actions">
                        <div className="b-search-form-action__location-from">
                            <Suggest setResult={this.locationFrom.bind(this)} data={{placeholder: 'Откуда', location: this.state.from, setCurrentLocation: this.state.fromId ? false : true}}/>
                        </div>
                        <div className="b-search-form-action__location-to">
                            <Suggest setResult={this.locationTo.bind(this)} data={{placeholder: 'Куда', location: this.state.to}}/>
                        </div>
                        <div className="b-search-form-action__date">
                            <DatepickerRange
                                startDate={this.state.fromDate}
                                endDate={this.state.toDate}
                                setStartDate={this.setFromDate.bind(this)}
                                setEndDate={this.setToDate.bind(this)}
                                />
                        </div>
                        <div className="b-search-form-action__people">
                            <div className="b-suggest">
                                <input className="b-suggest__input" placeholder="5 негров, в багажнике" type="text"/>
                            </div>
                        </div>
                        <div className="b-search-form-action__btn">
                            <span className="btn btn-green"
                                  onClick={this.handleStartSearch.bind(this)}
                                >
                                Найти
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default SearchForm;
