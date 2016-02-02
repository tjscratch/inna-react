//const requireFields = (...names) => data =>
//    names.reduce((errors, name) => {
//        if (!data[name]) {
//            errors[name] = 'Required';
//        }
//        return errors;
//    }, {});
//const validateAddress = requireFields('street', 'city');
//const validateChild = requireFields('name', 'age');

const validateForm = data => {
    //console.log('validateForm', data);
    const errors = {};

    if (!data.email) {
        errors.email = 'Нужно ввести email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Неправильный email';
    }

    //в мобильной версии проверяем поле с телефоном
    if (data.isMobile) {
        if (!data.phone) {
            errors.phone = 'Нужно ввести телефон';
        }
    }
    else {
        //в десктопной - поле с номером
        if (!data.phone_number) {
            errors.phone_number = 'Нужно ввести телефон';
        }
    }

    //agree
    if (!data.agree) {
        errors.agree = 'Нужно согласиться с условиями';
    }

    if (data.passengers) {
        errors.passengers = [];
        data.passengers.forEach((pas, ix)=>{
            errors.passengers[ix] = {};
            if (!pas.gender) {
                errors.passengers[ix].gender = 'Пол';
            }
            if (!pas.name) {
                errors.passengers[ix].name = 'Введите имя';
            }
            if (!pas.lastName) {
                errors.passengers[ix].lastName = 'Введите фамилию';
            }
            if (!pas.birth) {
                errors.passengers[ix].birth = 'Введите дату рождения';
            }
            if (!pas.citizenship) {
                errors.passengers[ix].citizenship = 'Введите гражданство';
            }
            if (!pas.docType) {
                errors.passengers[ix].docType = 'Введите тип док.';
            }
            if (!pas.docNumber) {
                errors.passengers[ix].docNumber = 'Введите номер док.';
            }
            if (!pas.docExpires) {
                errors.passengers[ix].docExpires = 'Введите дату';
            }
            //console.log('errors.passengers[ix]', errors.passengers[ix]);
        })
    }

    //errors.shipping = validateAddress(data.shipping);
    //errors.billing = validateAddress(data.billing);
    //errors.children = data.children.map(validateChild);

    return errors;
};

export default validateForm;