const requireFields = (...names) => data =>
    names.reduce((errors, name) => {
        if (!data[name]) {
            errors[name] = 'Required';
        }
        return errors;
    }, {});
const validateAddress = requireFields('street', 'city');
const validateChild = requireFields('name', 'age');

const validateForm = data => {
    console.log('validateForm', data);
    const errors = {};

    if (!data.email) {
        errors.email = 'Нужно ввести email';
    }

    if (!data.phone) {
        errors.phone = 'Нужно ввести телефон';
    }

    //if (!data.name) {
    //    errors.name = 'Required';
    //}
    //if (!data.lastName) {
    //    errors.lastName = 'Required';
    //}

    //if (!data.passengers || data.passengers.length == 0) {
    //    errors.passengers = 'Required';
    //}
    //
    //if (data.passengers) {
    //    errors.passengers = [];
    //    data.passengers.forEach((pas, ix)=>{
    //        errors.passengers[ix] = {};
    //        if (!pas.name) {
    //            errors.passengers[ix].name = 'Required';
    //        }
    //
    //        if (!pas.lastName) {
    //            errors.passengers[ix].lastName = 'Required';
    //        }
    //
    //    })
    //}

    //errors.shipping = validateAddress(data.shipping);
    //errors.billing = validateAddress(data.billing);
    //errors.children = data.children.map(validateChild);
    return errors;
};

export default validateForm;