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

    //componentDidMount() {
        //this.getData();
    //}

    //componentWillMount() {
    //    this.getData();
    //}
    //
    //getData() {
    //    var sectionId = 4;
    //    api.get(`/Section/Get/${sectionId}`).then((data) => {
    //        console.log('getData fetched');
    //        if (data && data.SectionLayouts && data.SectionLayouts.length > 0) {
    //
    //            this.setState({
    //                sections: data.SectionLayouts
    //            });
    //        }
    //    });
    //}

    renderSections() {
        return (
            <div>
                {this.state.sections.map((section, index)=> {
                    return (
                        <div key={index}>
                            {section.OfferLayouts.map((offer, ix)=>{
                                return (
                                    <div key={ix}>{offer.OfferLayoutType}</div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
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
