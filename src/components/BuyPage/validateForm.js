import { getStore } from '../../store/storeHolder';


const validateForm = data => {
    //console.log('validateForm', data);
    const errors = {};

    //errors.shipping = validateAddress(data.shipping);
    //errors.billing = validateAddress(data.billing);
    //errors.children = data.children.map(validateChild);

    return errors;
};

export default validateForm;