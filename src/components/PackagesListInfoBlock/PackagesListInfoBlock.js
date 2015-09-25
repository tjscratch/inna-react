import React, { PropTypes } from 'react';
import styles from './PackagesListInfoBlock.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class PackagesListInfoBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data;
        if (data) {
            return (
                <div className="b-packages-results-info-block">
                    <b>Включено в стоимость:</b><br/>
                    Авиаперелет<br/>
                    Проживание<br/>
                    Мед.страховка<br/>
                    Топливный сбор<br/>
                    Дополнительно:<br/>
                    Трансфер<br/>
                </div>
            );
        }

        return null;
    }

}

export default PackagesListInfoBlock;
