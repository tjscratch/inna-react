import React, { PropTypes } from 'react';
import styles from './SearchForm.scss';
import withStyles from '../../decorators/withStyles';
import TabsNav from '../TabsNav';
import Suggest from '../ui/Suggest';

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
        
        //if (data) {
        //    this.state = {
        //        ...data
        //    };
        //}
        //else {
        //    this.state = {
        //        locationFrom: null,
        //        locationTo: null,
        //    };
        //}

            this.state = {
                locationFrom: null,
                locationTo: null,
            };
    }

    getFlightClassName() {
        var flightClass = this.state.flightClass;
        if (flightClass) {
            //прводим к числу
            switch (+flightClass) {
                case 0: return 'эконом';
                case 1: return 'бизнес';
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
            locationFrom: data.Id
        }); 
    }

    locationTo(data) {
        this.setState({
            locationTo: data.Id
        });
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
                            <Suggest setResult={this.locationFrom.bind(this)} data={{placeholder: 'Откуда'}}/>
                        </div>
                        <div className="b-search-form-action__location-to">
                            <Suggest setResult={this.locationTo.bind(this)} data={{placeholder: 'Куда'}}/>
                        </div>
                        <div className="b-search-form-action__date-from">
                            <div className="b-suggest">
                                <input className="b-suggest__input" placeholder="Туда" type="text"/>
                            </div>
                        </div>
                        <div className="b-search-form-action__date-to">
                            <div className="b-suggest">
                                <input className="b-suggest__input" placeholder="Обратно" type="text"/>
                            </div>
                        </div>
                        <div className="b-search-form-action__people">
                            <div className="b-suggest">
                                <input className="b-suggest__input" placeholder="5 негров, эконом" type="text"/>
                            </div>
                        </div>
                        <div className="b-search-form-action__btn">
                            <span className="btn btn-green">
                                Найти
                            </span>
                        </div>
                    </div>
                    <div>locationFrom - {this.state.locationFrom}</div>
                    <div>locationTo - {this.state.locationTo}</div>
                </div>
            </section>
        );
    }

}

export default SearchForm;
