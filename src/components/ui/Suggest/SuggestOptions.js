import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';


class SuggestOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: null
        };
    }

    setData(data) {
        this.setState({
            options: data
        });
    }

    selectedOptionItem(item) {
        if (this.props.setLocation) {
            this.props.setLocation(item)
        }
    }


    render() {
        if (this.state.options) {
            return (
                <ul className="b-suggest__list dsfse">
                    {this.state.options.map((item, index)=> {
                        return (
                            <li className="b-suggest-item" key={index} onClick={this.selectedOptionItem.bind(this, item)}>
                                <span className="b-suggest-item__city-name">{item.Name}</span>,
                                <span className="b-suggest-item__country-name">{item.CountryName}</span>
                                <span className="b-suggest-item__iata">{item.CodeIata}</span>
                            </li>
                        );
                    }, this)}
                </ul>
            );
        } else {
            return null;
        }
    }

}

export default SuggestOptions;
