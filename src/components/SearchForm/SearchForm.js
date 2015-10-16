import React, { PropTypes } from 'react';
import moment from 'moment';
import api from '../../core/ApiClient';
import apiUrls from '../../constants/ApiUrls.js';
import styles from './SearchForm.scss';
import withStyles from '../../decorators/withStyles';
import TabsNav from '../TabsNav';
import Suggest from '../ui/Suggest';
import Datepicker from '../ui/Datepicker';


@withStyles(styles) class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        //начальные данные для рендера на сервере
        let data = props ? props.data : null;

        //формат данных:
        /*
         fromId
         toId
         fromDate
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

        this.state = {
            datepickerStartShow: false,
            datepickerEndShow: false
        }

    }

    getFlightClassName() {
        var flightClass = this.state.flightClass;
        if (flightClass) {
            //прводим к числу
            switch (+flightClass) {
                case 0:
                    return 'эконом';
                case 1:
                    return 'бизнес';
            }
        }

        return 'эконом';
    }

    getPeopleCount() {
        var adultCount = 0;
        var childCount = 0;

        if (this.state.adultCount) {
            adultCount = +this.state.adultCount;
        }
        var childAges = this.state.childAges;
        if (childAges) {
            let agesArray = childAges.split('_');
            if (agesArray) {
                childCount = agesArray.length;
            }
        }

        //ToDo: прикрутить множественную форму
        return `${adultCount + childCount} человек`;
    }

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

    openDatepicker(type, isShow) {
        if (type == 'start') {
            this.setState({
                datepickerStartShow: isShow,
                datepickerEndShow: !isShow
            })
        }
        if (type == 'end') {
            this.setState({
                datepickerStartShow: !isShow,
                datepickerEndShow: isShow
            })
        }
    }

    setSelectedDate(type, day) {
        //console.table({
        //    type: type,
        //    data: data.format("DD MMMM")
        //})
        if (type == 'start') {
            this.setState({
                fromDate: day.date.format("DD MMMM")
            })
            this.openDatepicker('start', false);
            this.openDatepicker('end', true);
        }
        if (type == 'end') {
            this.setState({
                toDate: day.date.format("DD MMMM")
            })
            this.openDatepicker('end', false);
        }
    }


    renderDatepickerStart() {
        if (this.state.datepickerStartShow) {
            return (
                <Datepicker
                    range={true}
                    setDate={this.setSelectedDate.bind(this)}
                    start={this.state.datepickerStartShow}
                    end={this.state.datepickerEndShow}
                    />
            )
        }
    }

    renderDatepickerEnd() {
        if (this.state.datepickerEndShow) {
            return (
                <Datepicker
                    range={true}
                    setDate={this.setSelectedDate.bind(this)}
                    start={this.state.datepickerStartShow}
                    end={this.state.datepickerEndShow}
                    />
            )
        }
    }

    render() {
        return (
            <section className="b-search-form">
                <div className="b-search-form__tabs">
                    <TabsNav/>
                </div>
                <div className="b-search-form__form">
                    <div className="b-search-form__actions">
                        <div className="b-search-form-action__location-from">
                            <Suggest setResult={this.locationFrom.bind(this)} data={{placeholder: 'Откуда', location: this.state.from, setCurrentLocation: this.state.fromId ? false : true}}/>
                        </div>
                        <div className="b-search-form-action__location-to">
                            <Suggest setResult={this.locationTo.bind(this)} data={{placeholder: 'Куда', location: this.state.to}}/>
                        </div>
                        <div className="b-search-form-action__date-from">
                            <div className="b-search-form-date">
                                <input className="b-search-form-date__input" placeholder="Туда" type="text"
                                       onFocus={this.openDatepicker.bind(this, 'start', true)}
                                       value={this.state.fromDate}/>
                                <i className="b-search-form-date__icon icon-emb-calendar"></i>
                            </div>
                            {this.renderDatepickerStart()}
                        </div>
                        <div className="b-search-form-action__date-to">
                            <div className="b-search-form-date">
                                <input className="b-search-form-date__input" placeholder="Обратно" type="text"
                                       onFocus={this.openDatepicker.bind(this, 'end', true)}
                                       value={this.state.toDate}/>
                                <i className="b-search-form-date__icon icon-emb-calendar"></i>
                            </div>
                            {this.renderDatepickerEnd()}
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
