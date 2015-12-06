import React, { PropTypes } from 'react';
import styles from './DetailsPage.scss';
import withStyles from '../../decorators/withStyles';
import OffersSlider from '../OffersSlider';
import OffersList from '../OffersList';
import SearchForm from '../SearchForm';
import {PhotoSwipe} from 'react-photoswipe';

@withStyles(styles) class DetailsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: true
        }
    }


    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };


    handleClose(){
        this.setState({
            isOpen: false
        });
    };


    render() {
        let title = 'Ростур';
        this.context.onSetTitle(title);

        let items = [
            {
                src: 'http://lorempixel.com/1200/900/sports/1',
                w: 1200,
                h: 900,
                title: 'Image 1'
            },
            {
                src: 'http://lorempixel.com/1200/900/sports/2',
                w: 1200,
                h: 900,
                title: 'Image 2'
            }
        ];

        let options = {
            //http://photoswipe.com/documentation/options.html
        };

        return (
            <section className="b-main-page">
                <div className="b-main-page__slider">
                    <OffersSlider />
                    <SearchForm/>
                </div>
                <div className="b-details">
                    
                    <div className="b-details-head">
                        
                        <div className="b-details-head__info">
                            <h1 className="b-details-head__title">
                                Горнолыжный комплекс «Казань»
                            </h1>
                            <div>
                                Адрес: <b>Россия, Республика Татарстан, Верхнеуслонский район, деревня Савино</b>
                            </div>
                            <div>Телефон: <b>+7 (843) 221-66-11, +7 (843) 221-66-01</b></div>
                            <div>Email: <b>info@ski-kazan.ru</b></div>
                        </div>
                        
                        <div className="b-details-head__track">
                            <div className="b-details-head__track-item">
                                <b>Часы работы:</b> ПН – 14:00-21:00 ВТ-ЧТ – 11:00-21:00 ПТ – 11:00-22:00 СБ – 10:00-22:00 ВС – 10:00-21:00
                            </div>
                            <div className="b-details-head__track-item">
                                <b>Как добраться до объекта:</b> Автомобиль: выезд из Казани по ул. Горьковское шоссе по федеральной трассе М7. На кольцевой развязке следовать по указателю на Ульяновск.
                                После моста через Волгу ехать прямо по московскому направлению, далее направо по указателю на ГСОК «Казань».
                            </div>
                        </div>
                        
                    </div>

                    <PhotoSwipe isOpen={this.state.isOpen} items={items} options={options} onClose={this.state.handleClose}/>
                    
                </div>
            </section>
        );
    }

}

export default DetailsPage;
