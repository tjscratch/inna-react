import React, { PropTypes } from 'react';
import styles from './AboutPage.scss';
import withStyles from '../../decorators/withStyles';

import { connect } from 'react-redux';

@withStyles(styles) class AboutPage extends React.Component {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    render() {
        let title = 'Инна-Тур';
        this.context.onSetTitle(title);
        return (
            <section className="b-page__about">
                <h1>О компании</h1>
            </section>
        );
    }

}

//export default MainPage;

function mapStateToProps(state) {
    return {
        data: state.main
    }
}

export default connect(
    mapStateToProps
)(AboutPage)
