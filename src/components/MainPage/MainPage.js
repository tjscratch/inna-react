import React, { PropTypes } from 'react';
import styles from './MainPage.scss';
import withStyles from '../../decorators/withStyles';
import OffersSlider from '../OffersSlider';
import OffersLanding from '../OffersLanding';
import OffersList from '../OffersList';
import SearchForm from '../SearchForm';

import { connect } from 'react-redux';

@withStyles(styles) class MainPage extends React.Component {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    render() {
        let title = 'Инна-Тур';
        this.context.onSetTitle(title);

        let dataSlider = {
          countryName: 'Тайланд',
          tittle: 'Поиск туров на регулярных рейсах',
          description: 'АВИАБИЛЕТ + ОТЕЛЬ = ВМЕСТЕ ВЫГОДНЕЕ',
          srcImage: 'http://oboifullhd.ru/_ph/33/623007775.jpg',
          slogan : [
            {
              tittle: 'Выгода',
              description: 'Экономия до 30% за счет<br/>специальных пакетных цен<br/>Страховка в подарок'
            },
            {
              tittle: 'Свобода',
              description: '200 стран 670 000 отелей<br/>500 авиакомпаний<br/>Сам себе турагент'
            },
            {
              tittle: 'Надежность',
              description: 'Перелет на регулярных рейсах<br/>Моментальная оплата поставщикам<br/>Гарантия поездки'
            }
          ]
        }

        return (
            <section className="b-main-page">
                <div className="b-main-page__search-form">
                    <SearchForm/>
                </div>
                <div className="b-main-page__slider">
                    <OffersSlider data={dataSlider}/>
                </div>
                <div className="b-main-page__offers-landing">
                    <OffersLanding />
                </div>
                <div className="b-main-page__offers-list">
                    <OffersList {...this.props} />
                </div>
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
)(MainPage)
