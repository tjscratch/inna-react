import React, { PropTypes } from 'react';
import styles from './BreadCrumbs.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles) class BreadCrumbs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data;
        if (data) {
            return (
                <ul className="b-crumbs-list">
                    {data.map((item, ix)=> {
                        if (item.link) {
                            return (
                                <li key={ix} className="b-crumbs-item">
                                    <a href={item.link}
                                       className="b-crumbs-item-link"
                                       onClick={Link.handleClick}>{item.text}</a>
                                </li>
                            );
                        }
                        else {
                            return (
                                <li key={ix} className="b-crumbs-item">{item.text}</li>
                            );
                        }
                    })}
                </ul>
            );
        }

        return null;
    }

}

export default BreadCrumbs;
