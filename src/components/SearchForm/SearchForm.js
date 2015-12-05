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
    }


    render() {
        return (
            <section className="b-search-form">
                <div className="b-search-form__form">
                    <Select
                        name="form-field-name"
                        value="one"
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
