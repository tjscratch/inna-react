import React, {PropTypes} from 'react';

import {connect} from 'react-redux';
import {getNeedSmsValidation} from '../../actions/action_sms';

import styles from './NeedSmsValidation.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

import apiClient from '../../core/ApiClient';
import apiUrls from '../../constants/ApiUrls';

import ButtonSecondary from '../ui/Buttons/ButtonSecondary/ButtonSecondary.js'

@withViewport
@withStyles(styles)
class NeedSmsValidation extends React.Component {
    constructor (props) {
        super(props);
    }

    checkNeedSmsValidation () {
        // var { dispatch } = this.props;
        // dispatch(getNeedSmsValidation({ Phone: '+79099593106' }))

        let params = { term: 'Vjc' };
        apiClient.get(apiUrls.DictionaryHotel, params)
            .then((data)=> {
                console.log(data)
            });

        
        apiClient.post(apiUrls.getSmsCode, { Phone: '+79099593106' })
            .then((data) => {
                console.log(data)
            })

    }

    render () {
        return (
            <div>
                <ButtonSecondary onClick={this.checkNeedSmsValidation.bind(this)}>Подтверждение по смс</ButtonSecondary>
            </div>
        )
    }
}

// function mapStateToProps (state) {
//     return {
//         data: state.hotelDetails
//     }
// }

export default connect()(NeedSmsValidation)
