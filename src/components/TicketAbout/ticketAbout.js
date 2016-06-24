import React, { PropTypes, Component } from 'react';
import styles from './TicketAbout.scss';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Overlay from '../ui/Overlay';

@withViewport
@withStyles(styles)
class TicketAbout extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div style="margin: auto; top: 0px; right: 0px; left: 0px; bottom: 0px; width: 300px; height: 300px; position: absolute;">
              asjdhsadasdas
            </div>
        )
    }
}

export default TicketAbout;
