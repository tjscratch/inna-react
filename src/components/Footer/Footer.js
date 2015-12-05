/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './Footer.scss';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withViewport
@withStyles(styles) class footer extends React.Component {

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
            <footer className="footer">
                <div className="b-footer">
                    <div className="b-footer__company">
                        <div className="b-comp-info">
                            <div className="b-comp-info__text">
                                &copy;&nbsp;1992&ndash;2014 &laquo;Ростур&raquo;, все права защищены.
                                <br/>
                                            Многопрофильный туроператор, оказывающий полный комплекс туристических услуг.
                                <br/>
                                            Туры по всей России - всего более 500 различных городов.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

}

export default footer;
