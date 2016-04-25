/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, {PropTypes} from 'react';
import styles from './NavMobile.scss';
import Overlay from '../ui/Overlay';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class NavMobile extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            open: false
        };
    }

    static propTypes = {
        className: PropTypes.string
    };

    menuOpen (event) {
        event.preventDefault();
        this.setState({
            open: !this.state.open
        });
        this.renderMenu();
    }

    renderMenu () {
        if (this.state.open) {
            return (
                <Overlay className="Sidebar__container">
                    <div className="Sidebar__overlay">
                        <div className="Sidebar">
                            <div className="NavMobile">
                                <a href="/" className="NavMobile__item">
                                        <span className="NavMobile__item-icon">
                                            <i className="icon-emb-search"></i>
                                        </span>
                                        <span className="NavMobile__item-text">
                                            Новый поиск
                                        </span>
                                </a>
                                <a href="/about" className="NavMobile__item">
                                        <span className="NavMobile__item-icon">
                                            <i className="icon-emb-suitcase"></i>
                                        </span>
                                        <span className="NavMobile__item-text">
                                            О компании
                                        </span>
                                </a>
                                <a href="/contacts" className="NavMobile__item">
                                        <span className="NavMobile__item-icon">
                                            <i className="icon-emb-phone"></i>
                                        </span>
                                        <span className="NavMobile__item-text">
                                            Контакты
                                        </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Overlay>
            )
        } else {
            return null;
        }
    }

    render () {
        return (
            <div className={this.props.className} role="navigation">
                <div className="b-nav-mobile" role="navigation">
                    <a className="b-nav-mobile-menu icon-emb-menu" href="javascript:void(0);"
                       onClick={this.menuOpen.bind(this)}></a>
                </div>
                {this.renderMenu()}
            </div>
        );
    }

}

export default NavMobile;
