/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './Footer.scss';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withViewport
@withStyles(styles)
class footer extends React.Component {

  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired
  };

  render () {

    return (
      <footer className="footer">
        <div className="b-footer">
          <div className="b-footer__info">
            <div className="b-footer-info">
              <div className="b-footer-info__links">
                <div className="b-footer-links">
                  <ul className="b-footer-links__list">
                    <li className="b-footer-links__link">
                      <a href="/about/" onClick={Link.handleClick}>О компании</a>
                    </li>
                    <li className="b-footer-links__link">
                      <a href="https://inna.ru/proxy/wp.me/p3J7R4-24">Новости</a>
                    </li>
                    <li className="b-footer-links__link">
                      <a href="https://inna.ru/proxy/www.inna.ru/corporate/">Корпоративным
                                                                             клиентам</a>
                    </li>
                    <li className="b-footer-links__link">
                      <a href="/contacts/" onClick={Link.handleClick}>Контакты</a>
                    </li>
                    <li className="b-footer-links__link">
                      <a href="https://inna.ru/proxy/book.inna.ru/">Агентствам</a>
                    </li>
                    <li className="b-footer-links__link">
                      <a href="https://inna.ru/proxy/www.inna.ru/catalog/guide/">Каталог
                                                                                 стран</a>
                    </li>
                    <li className="b-footer-links__link">
                      <a href="https://inna.ru/proxy/www.inna.ru/client/abc/">Полезная
                                                                              информация</a>
                    </li>
                    <li className="b-footer-links__link">
                      <a href="https://inna.ru/proxy/www.inna.ru/catalog/guide/">Старый
                                                                                 сайт</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="b-footer-info__right">
                <div className="b-social-and-phone">
                  <div className="b-social-and-phone__social">
                    <div className="b-footer-social">
                      <ul className="b-footer-social__list">
                        <li className="b-footer-social__link">
                          <a href="https://vk.com/innatour_official" target="_blank">
                            <i className="social-icon social-icon__vkontakte"></i>
                          </a>
                        </li>
                        <li className="b-footer-social__link">
                          <a href="https://odnoklassniki.ru/innatour" target="_blank">
                            <i className="social-icon social-icon__odnoklassniki"></i>
                          </a>
                        </li>
                        <li className="b-footer-social__link">
                          <a href="https://www.facebook.com/INNATOURCOMPANY" target="_blank">
                            <i className="social-icon social-icon__facebook"></i>
                          </a>
                        </li>
                        <li className="b-footer-social__link">
                          <a href="https://twitter.com/inna_tour" target="_blank">
                            <i className="social-icon social-icon__twitter"></i>
                          </a>
                        </li>
                        <li className="b-footer-social__link">
                          <a href="https://www.pinterest.com/innatour/" target="_blank">
                            <i className="social-icon social-icon__pinterest"></i>
                          </a>
                        </li>
                        <li className="b-footer-social__link">
                          <a href="https://www.youtube.com/user/InnaTourMos/featured" target="_blank">
                            <i className="social-icon social-icon__youtube"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="b-social-and-phone__phone">
                    <div className="b-footer-phone">
                      <div className="b-footer-phone__text">
                        многоканальный телефон
                      </div>
                      <div className="b-footer-phone__phone">
                        +7&nbsp;495 742-1212
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
                ИННА ТУР (INNA TOUR) — многопрофильный туроператор, оказывающий полный комплекс
                туристических услуг.
                Туры в Великобританию, Францию, Италию, Швейцарию, Барбадос, Вьетнам, Доминикану,
                Индонезию,
                Камбоджу, Кубу, Мексику, Тайланд, Филиппины, Ямайку, ОАЭ и др. - всего более 40
                направлений по всему миру.
              </div>
              <div className="b-comp-info__copyright">
                <div>&copy;&nbsp;1992&ndash;2014 &laquo;ИННА ТУР&raquo;, все права защищены.</div>
                <div>Реестр туроператоров&nbsp;
                  <a href="https://inna.ru/proxy/reestr.russiatourism.ru/?ac=view&id_reestr=8893" target="_blank">МТ3 008557</a>
                </div>
              </div>
            </div>
          </div>
          <div className="b-footer__votes">
            <div className="b-trip-votes">
              <div className="b-trip-votes__votes">
                Теперь с отзывами об отелях от
              </div>
              <div className="b-trip-votes__logo">
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

}

export default footer;
