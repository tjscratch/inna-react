import React, { PropTypes } from 'react';
import moment from 'moment';
import api from '../../core/ApiClient';
import apiUrls from '../../constants/ApiUrls.js';
import siteUrls from '../../constants/SiteUrls.js';
import styles from './SearchForm.scss';
import withStyles from '../../decorators/withStyles';
import TabsNav from '../TabsNav';
import Suggest from '../ui/Suggest';
import DatepickerRange from '../ui/DatepickerRange';
import PeopleSelector from '../ui/PeopleSelector';
import Select from 'react-select';

//data
import suggestData from '../../rostravel/suggestData';

@withStyles(styles) class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //options: [
            //    {value: 'one', label: 'One'},
            //    {value: 'two', label: 'Two'}
            //]
            options: suggestData.getOptions()
        }
    }

    handleStartSearch() {
        let searchParams = [
            this.state.fromId,
            this.state.toId,
            this.state.fromDate,
            this.state.toDate,
        ].join('-');
        //window.location = `${siteUrls.SearchPackages}${searchParams}-01.10.2015-08.10.2015-0-2-2`;
        window.location = `${siteUrls.SearchPackages}${searchParams}-0-2-2`;
    }


    logChange(val) {
        console.log("Selected: " + val);

        var self = this;

        if (val) {
            //если массив - значит тут теги
            if (isArray(val)) {
                console.log('get by tags');
                api.localGet('/api/getObjects', {tagsIds:val.join(',')}).then((data)=>{
                    console.log('api data:', data);
                    if (data && data.items) {
                        self.props.onItemsLoad ? self.props.onItemsLoad({
                            items: data.items
                        }) : null;
                    }
                }).catch((err)=>{
                    console.log('api err', err);
                })
            }
            else {
                console.log('get by itemIds', val.itemsIds.join(','));
                api.localGet('/api/getObjects', {itemIds:val.itemsIds.join(',')}).then((data)=>{
                    console.log('api data:', data);
                    if (data && data.items) {
                        self.props.onItemsLoad ? self.props.onItemsLoad({
                            locationId: val.locationId,
                            price: val.price,
                            items: data.items
                        }) : null;
                    }
                }).catch((err)=>{
                    console.log('api err', err);
                })
            }
        }
    }


    render() {
        return (
            <section className="b-search-form">
                <div className="b-search-form__form">
                    <Select
                        name="form-field-name"
                        value=""
                        placeholder="Выберите тип туризма или куда поехать"
                        options={this.state.options}
                        onChange={this.logChange.bind(this)}
                        />
                    <div className="btn btn-green"
                         onClick={this.handleStartSearch.bind(this)}
                        >
                        Найти
                    </div>
                </div>
            </section>
        );
    }

}

export default SearchForm;

function isArray(array) {
    if (Object.prototype.toString.call(array) === '[object Array]') {
        return true;
    }
    return false;
}