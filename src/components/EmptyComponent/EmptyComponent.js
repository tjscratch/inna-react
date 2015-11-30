//компонент - шаблон, для сождания новых компонентов

import React, { PropTypes, Component } from 'react';
import styles from './EmptyComponent.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class EmptyComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div></div>
        );
    }

}

export default EmptyComponent;
