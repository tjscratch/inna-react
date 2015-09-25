//компонент - шаблон, для сождания новых компонентов

import React, { PropTypes } from 'react';
import styles from './EmptyComponent.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class EmptyComponent extends React.Component {
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
