/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './footer.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withViewport
@withStyles(styles) class footer {

    static propTypes = {
        viewport: PropTypes.shape({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired
        }).isRequired
    };

    render() {
        // This is just an example how one can render CSS
        let { width, height } = this.props.viewport;
        this.renderCss(`.footer-viewport:after {content:' ${width}x${height}';}`);

        return (
            <div className="footer">
                <div className="footer-container">
                    <span ref="viewport" className="footer-viewport footer-text--muted">Viewport:</span>

                    <div className="b-footer">
                        <div className="b-footer__info">
                            <div className="b-footer-info">
                                <div className="b-footer-info__links">
                                    <div className="b-footer-links">
                                        <ul className="b-footer-links__cont">
                                            <li className="b-footer-links__link">
                                                <a href="/about/" onClick={Link.handleClick}>О компании</a>
                                            </li>
                                            <li className="b-footer-links__link">
                                                <a href="https://inna.ru/proxy/wp.me/p3J7R4-24">Новости</a>
                                            </li>
                                            <li className="b-footer-links__link">
                                                <a href="https://inna.ru/proxy/www.inna.ru/corporate/">Корпоративным клиентам</a>
                                            </li>
                                            <li className="b-footer-links__link">
                                                <a href="/contacts/" onClick={Link.handleClick}>Контакты</a>
                                            </li>
                                            <li className="b-footer-links__link">
                                                <a href="https://inna.ru/proxy/book.inna.ru/">Агентствам</a>
                                            </li>
                                            <li className="b-footer-links__link">
                                                <a href="https://inna.ru/proxy/www.inna.ru/catalog/guide/">Каталог стран</a>
                                            </li>
                                            <li className="b-footer-links__link">
                                                <a href="https://inna.ru/proxy/www.inna.ru/client/abc/">Полезная информация</a>
                                            </li>
                                            <li className="b-footer-links__link">
                                                <a href="https://inna.ru/proxy/www.inna.ru/catalog/guide/">Старый сайт</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="b-footer-info__right">
                                    <div className="b-social-and-phone">
                                        <div className="b-social-and-phone__social">
                                            <div className="b-footer-social">
                                                <ul className="b-footer-social__cont">
                                                    <li className="b-footer-social__link">
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="b-social-and-phone__phone">
                                            <div className="b-footer-phone">
                                                <div className="b-footer-phone__text">
                                                </div>
                                                <div className="b-footer-phone__phone">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="b-footer__company">
                            <div className="b-comp-info">
                                <div className="b-comp-info__text">
                                </div>
                                <div className="b-comp-info__copyright">
                                </div>
                            </div>
                        </div>
                        <div className="b-footer__votes">
                            <div className="b-trip-votes">
                                <div className="b-trip-votes__votes">
                                </div>
                                <div className="b-trip-votes__logo">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default footer;
