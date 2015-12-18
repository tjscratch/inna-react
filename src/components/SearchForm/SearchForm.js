import React, { PropTypes } from 'react';
import moment from 'moment';
import api from '../../core/ApiClient';
import apiUrls from '../../constants/ApiUrls.js';
import siteUrls from '../../constants/SiteUrls.js';
import Location from '../../core/Location';
import styles from './SearchForm.scss';
import withStyles from '../../decorators/withStyles';
import TabsNav from '../TabsNav';
import Suggest from '../ui/Suggest';
import DatepickerRange from '../ui/DatepickerRange';
import PeopleSelector from '../ui/PeopleSelector';


@withStyles(styles)
class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        //console.log('SearchForm props', props);

        //начальные данные для рендера на сервере
        var { directory, routeParams } = props;

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

        if (routeParams) {
            this.state = {
                ...routeParams,
                from: directory[routeParams.fromId],
                to: directory[routeParams.toId]
            };
        }
        else {
            this.state = {
                fromId: null,
                toId: null,
                fromDate: null,
                toDate: null,
                flightClass: 1,
                adultCount: 2,
                childAges: null
            };
        }
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
            this.state.toId,
            this.state.fromDate,
            this.state.toDate,
            this.state.flightClass,
            this.state.adultCount,
            this.state.childAges
        ].join('-');
        Location.pushState(null, `${siteUrls.SearchPackages}${searchParams}`);
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

    setAdultCount(data) {
        this.setState({
            adultCount: data
        })
    }

    setChildAges(data) {
        this.setState({
            childAges: data
        })
    }

    setFlightClass(data){
        this.setState({
            flightClass: data
        })
    }

    render() {
        let { data } = this.props;

        return (
            <section className="b-search-form">
                <div className="b-search-form__tabs">
                    <TabsNav/>
                </div>
                <div className="b-search-form__form">
                    <div className="b-search-form__actions">
                        <div className="b-search-form-action__location-from">
                            <Suggest setResult={this.locationFrom.bind(this)}
                                     data={{placeholder: 'Откуда', location: this.state.from, setCurrentLocation: this.state.fromId ? false : true}}/>
                        </div>
                        <div className="b-search-form-action__location-to">
                            <Suggest setResult={this.locationTo.bind(this)}
                                     data={{placeholder: 'Куда', location: this.state.to}}/>
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
                            <PeopleSelector
                                adultCount={this.state.adultCount}
                                setAdultCount={this.setAdultCount.bind(this)}
                                childAges={this.state.childAges}
                                setChildAges={this.setChildAges.bind(this)}
                                flightClass={this.state.flightClass}
                                setFlightClass={this.setFlightClass.bind(this)}
                            />
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
