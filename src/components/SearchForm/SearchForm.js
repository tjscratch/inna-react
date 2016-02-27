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
import SearchFormValidation from './SearchFormValidation';


@withStyles(styles)
class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        var { directory, routeParams } = props;

        if (routeParams) {
            this.state = {
                ...routeParams,
                from: directory[routeParams.fromId],
                to: directory[routeParams.toId],
                valid: {},
            };
        }
        else {
            this.state = {
                fromId: null,
                toId: null,
                fromDate: null,
                toDate: null,
                flightClass: 0,
                adultCount: 2,
                childAges: null,
                valid: {},
            };
        }
    }

    locationFrom(data) {
        this.setState({
            fromId: data.Id,
            valid: {},
        });
    }

    locationTo(data) {
        if (data) {
            this.setState({
                toId: data.Id,
                valid: {},
            });
        } else {
            this.setState({
                toId: null,
                valid: {},
            });
        }
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
        //Location.pushState(null, `${siteUrls.SearchPackages}${searchParams}`);
        let validation = new SearchFormValidation(this.state);
        validation.validation()
            .then((data)=> {
                if (data.valid) {
                    Location.pushState(null, `${siteUrls.SearchPackages}${searchParams}`);
                } else {
                    this.setState({
                        valid: data
                    });
                    //console.log(this.state.valid);
                }
            });
    }


    setFromDate(date) {
        this.setState({
            fromDate: date,
            valid: {},
        });
    }

    setToDate(date) {
        this.setState({
            toDate: date,
            valid: {},
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

    setFlightClass(data) {
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
                            {this.state.valid.key == 'fromId' ? <div className="b-search-form-action__error">{this.state.valid.error}</div> : null}
                        </div>
                        <div className="b-search-form-action__location-to">
                            <Suggest setResult={this.locationTo.bind(this)}
                                     data={{placeholder: 'Куда', location: this.state.to}}/>
                            {this.state.valid.key == 'toId' ? <div className="b-search-form-action__error">{this.state.valid.error}</div> : null}
                        </div>
                        <div className="b-search-form-action__date">
                            <DatepickerRange
                                startDate={this.state.fromDate}
                                endDate={this.state.toDate}
                                setStartDate={this.setFromDate.bind(this)}
                                setEndDate={this.setToDate.bind(this)}
                            />
                            {this.state.valid.key == 'fromDate' ? <div className="b-search-form-action__error b-search-form-action__error-from-date">{this.state.valid.error}</div> : null}
                            {this.state.valid.key == 'toDate' ? <div className="b-search-form-action__error b-search-form-action__error-to-date">{this.state.valid.error}</div> : null}
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
