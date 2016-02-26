import React, { PropTypes } from 'react';


class SelectedFilters extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        let data = this.props.data;
        let items = [];
        for (let key in data) {
            let item = data[key];
            if (key == 'Price') {
                let priceItem = data[key];
                if (priceItem.Min != priceItem.SelectedMin || priceItem.Max != priceItem.SelectedMax) {
                    items.push(priceItem);
                }
            } else {
                for (let keyItem in item) {
                    item[keyItem].Selected ? items.push(item[keyItem]) : null;
                }
            }
        }
        // в items все активные фильтры
        return null;
    }

}

export default SelectedFilters;
