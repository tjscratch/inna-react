import {reducer as formReducer} from 'redux-form';

import { PROCESS_FIELD } from '../actions/action_form';

export default formReducer;



//var form = formReducer.normalize({
//    customer: {                                    // <--- name of the form
//        //passengers: (pas) => {
//        //    console.log('normalize', pas);
//        //    //if (pas && pas.name) {
//        //    //    pas.name = pas.name.toUpperCase();
//        //    //}
//        //    return pas;
//        //},
//        //passengers: {
//        //    name:  value => value && value.toUpperCase()
//        //},
//        //name: value => value && value.toUpperCase(),   // normalizer for 'upper' field
//        //'passengers[].name': value => value && value.toUpperCase(),   // normalizer for 'upper' field
//        //name: (value, previousValue, allValues, previousAllValues) => {
//        //    console.log('value', value, 'allValues', allValues);
//        //    //if (allValues && allValues.passengers && allValues.passengers.length > 0) {
//        //    //    allValues.passengers.forEach((pas)=> {
//        //    //        if (pas.name) {
//        //    //            pas.name = pas.name.toString().toUpperCase();
//        //    //            console.log('pas.name', pas.name);
//        //    //        }
//        //    //    })
//        //    //}
//        //    return value && value.toUpperCase();
//        //}
//    }
//});

//var form = formReducer.plugin({
//    customer: (state, action) => { // <------ 'customer' is name of form given to reduxForm()
//        switch(action.type) {
//            //case PROCESS_FIELD:
//            //    console.log('state', state, 'action', action);
//            //    return {
//            //        ...state
//            //    };
//            default:
//                //console.log('state', state, 'action', action);
//                return state;
//        }
//    }
//});
//
//export default form;