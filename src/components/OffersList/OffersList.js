import React, { PropTypes } from 'react';
import api from './../../core/ApiClient';
import styles from './OffersList.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class OffersList extends React.Component {
    constructor(props) {
        super(props);
        //console.log('props', props);

        let data = props.data;
        if (data && data.SectionLayouts && data.SectionLayouts.length > 0) {
            this.state = {
                sections: data.SectionLayouts
            };
        }
        else {
            this.state = {
                sections: null
            };
        }

    }

    componentDidMount() {
        //this.getData();
    }

    getData() {
        var sectionId = 4;
        api.get(`/Section/Get/${sectionId}`).then((data) => {
            console.log(data);

            if (data && data.SectionLayouts && data.SectionLayouts.length > 0) {

                this.setState({
                    sections: data.SectionLayouts
                });
            }
        });
    }

    renderOffer(offer) {
        return (
            <div>{offer.OfferLayoutType}</div>
        );
    }

    renderSections() {
        var self = this;
        var result = this.state.sections.map((section, index)=> {
            return (
                <div key={index}>{section.OfferLayouts.map(self.renderOffer)}</div>
            );
        });

        return (
            <div>{result}</div>
        );
    }

    render() {
        if (this.state.sections) {
            return (
                <div className="b-offers-list">
                    {this.renderSections()}
                </div>
            );
        }
        else {
            return (
                <div className="b-offers-list">
                    тут будет стенка оферов
                </div>
            );
        }
    }

}

export default OffersList;
