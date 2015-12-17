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
        var isFilterBtnEnabled = true;
        var { disableFilterBtn } = this.props;
        if (disableFilterBtn) {
            isFilterBtnEnabled = false;
        }

        return (
            <div className="b-mobile-filters">
                <div className="b-mobile-selected-filter">
                    <div className="b-mobile-selected-filter__back icon-emb-left-open"
                         onClick={this.goBack}>
                    </div>
                    <div className="b-mobile-selected-filter__text">
                        <div className="b-mobile-selected-filter-text">
                            {this.props.children}
                        </div>
                    </div>
                    {
                        isFilterBtnEnabled ?
                            <div className="b-mobile-selected-filter__filter icon-emb-filter"
                                 onClick={this.openFilter}>
                            </div> : null
                    }
                </div>
            </div>
        );
    }

}

export default MobileSelectedFilter;
