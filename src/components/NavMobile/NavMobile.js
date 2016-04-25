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
                            <ul className="NavMobile">
                                <li><a href="/">О компании</a></li>
                                <li><a href="/">Главная</a></li>
                            </ul>
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
