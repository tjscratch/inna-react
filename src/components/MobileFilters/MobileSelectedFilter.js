import React, { PropTypes, Component } from 'react';
import styles from './MobileSelectedFilter.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class MobileSelectedFilter extends Component {
    constructor(props) {
        super(props);
    }

    goBack() {
        console.log('goBack');
        window.history.back();
    }

    openFilter() {
        alert('openFilter');
    }

    render() {
        return (
            <div className="b-mobile-filters">
                <div className="b-mobile-selected-filter">
                    <div className="b-mobile-selected-filter__back icon-emb-left-open"
                         onClick={this.goBack}>
                    </div>
                    <div className="b-mobile-selected-filter__text">
                        <div className="b-mobile-selected-filter-text">
                            <div className="b-mobile-selected-filter-text__caption">Египет</div>
                            <div className="b-mobile-selected-filter-text__description">8 ночей с 7 по 15 фев 2 взрослых</div>
                        </div>
                    </div>
                    <div className="b-mobile-selected-filter__filter icon-emb-filter"
                        onClick={this.openFilter}>
                    </div>
                </div>
            </div>
        );
    }

}

export default MobileSelectedFilter;
