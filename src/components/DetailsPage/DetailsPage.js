import React, { PropTypes } from 'react';
import styles from './DetailsPage.scss';
import withStyles from '../../decorators/withStyles';
import OffersSlider from '../OffersSlider';
import OffersList from '../OffersList';
import SearchForm from '../SearchForm';
import {PhotoSwipe, PhotoSwipeGallery} from 'react-photoswipe';
import api from './../../core/ApiClient';

@withStyles(styles) class DetailsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: null,
            streetAddress: null,
            isOpen: false,
            galleryItems: [
                {
                    src: 'http://lorempixel.com/1200/900/nightlife/1',
                    thumbnail: 'http://lorempixel.com/120/90/nightlife/1',
                    w: 1200,
                    h: 900,
                    title: 'Image 1'
                },
                {
                    src: 'http://lorempixel.com/1200/900/nightlife/2',
                    thumbnail: 'http://lorempixel.com/120/90/nightlife/2',
                    w: 1200,
                    h: 900,
                    title: 'Image 2'
                },
                {
                    src: 'http://lorempixel.com/1200/900/nightlife/3',
                    thumbnail: 'http://lorempixel.com/120/90/nightlife/3',
                    w: 1200,
                    h: 900,
                    title: 'Image 3'
                },
                {
                    src: 'http://lorempixel.com/1200/900/nightlife/4',
                    thumbnail: 'http://lorempixel.com/120/90/nightlife/4',
                    w: 1200,
                    h: 900,
                    title: 'Image 4'
                }
            ],
            options: {}
        }
    }


    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };


    openPhotoSwipe = (e) => {
        e.preventDefault();
        this.setState({
            isOpen: true,
            options: {
                closeOnScroll: true
            }
        });
    };

    handleClose = () => {
        this.setState({
            isOpen: false
        });
    };

    getThumbnailContent = (item) => {
        return (
            <img src={item.thumbnail} with={150} height={110}/>
        );
    };


    goBuy(url) {
        //window.location = url;
        window.open(url, '_blank')
    }

    componentDidMount(){
        api.localGet('/api/getObjects', {itemIds: this.props.id})
            .then((data)=> {
                console.log(data)
            })
    }

    render() {
        let title = 'Ростур';
        this.context.onSetTitle(title);
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
                            
                            <div className="b-details-head__buy">
                                <div className="b-details-head__buy-d">Перелет + Отель</div>
                                <div className="btn btn-orange" onClick={this.goBuy.bind(this, 'https://inna.ru/#/packages/search/6733-18820-21.12.2015-27.12.2015-0-2-')}>от 35 000 руб (за чел.)</div>
                            </div>
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

                    <h2 className="b-details-gallery__title">Горнолыжный комплекс «Казань» - фото</h2>
                    <PhotoSwipeGallery items={this.state.galleryItems} thumbnailContent={this.getThumbnailContent.bind(this)}/>
                    
                    <div className="b-details-desc">
                        Горнолыжный спортивно-оздоровительный комплекс (ГСОК) «Казань» – уникальный курорт, расположенный в живописнейшем месте слияния трех рек – Волги, Свияги и Сулицы. Он известен
                        своими качественными горнолыжными трассами. Их здесь пять, и все они имеют различную сложность и протяженность – от 730 до 1050 метров. А максимальный перепад высот здесь
                        составляет 165 метров. ГСОК «Казань» имеет две трассы для катания на сноутюбингах. Особенностью комплекса является преимущественно северная ориентация склонов. Основные услуги:
                        прокат, ремонт и хранение инвентаря, обучение катанию на горных лыжах и сноуборде, проведение конференций и торжеств, бронирование номеров, бассейн, сауны, гольф, боулинг и
                        даже стрельбище. Остановиться посетителям предлагается в одной из трех гостиниц («Дежавю», «Станция», «Каскад») с номерами разных категорий, либо в альпийских домиках. На
                        территории комплекса располагается множество кафе и ресторанов с разнообразной кухней народов мира и ценовой категорией. Горнолыжный сезон на ГСОК «Казань» начинается в ноябре
                        - декабре и заканчивается в марте - апреле.
                    </div>
                    
                </div>
            </section>
        );
    }

}

export default DetailsPage;
