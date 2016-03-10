import React, { PropTypes, Component } from 'react';
import styles from './MobileSelectedFilter.scss';
import withStyles from '../../decorators/withStyles';
import Overlay from '../ui/Overlay';
import Location from '../../core/Location';

@withStyles(styles)
class MobileSelectedFilter extends Component {
    constructor (props) {
        super(props);

        this.state = {
            openFilters: false
        }
    }

    goBack () {
        //window.history.back();
        Location.pushState(null, "/");
    }

    openFilter () {
        this.setState({
            openFilters: !this.state.openFilters
        })
    }

    renderFilters () {
        let filters = this.props.filters;
        if(this.state.openFilters){
            return (
                <Overlay>
                    <div className="b-filters-overlay">
                        {filters}
                        <div className="b-filters-overlay-btn"
                             onClick={this.openFilter.bind(this)}
                            >
                            Выбрать
                        </div>
                    </div>
                </Overlay>
            )
        }
    }

    render () {
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
                                 onClick={this.openFilter.bind(this)}>
                            </div>
                            :
                            null
                    }
                    {this.renderFilters()}
                </div>
            </div>
        );
    }

}

export default MobileSelectedFilter;
