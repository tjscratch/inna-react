class SearchFormValidation {

    constructor(props) {
        super.constructor(props);
        this.toId = {
            value: props.toId,
            valid: true,
            error: null
        };
        this.fromDate = {
            value: props.fromDate,
            valid: true,
            error: null
        };
    }

    validation() {
        required(this.toId, "Выберите город или страну, куда планируете поехать")
            .then((data)=> {
                console.log('then');
                console.log(data);
                return required(this.fromDate, "fromDate")
            })
            .catch((data)=> {
                console.log('reject')
                console.log(data)
            })
        return 3
    }

}


function required(obj, textError) {
    return new Promise((resolve, reject)=> {
        if (obj.value) {
            resolve(obj);
        } else {
            reject({
                value: obj.value,
                valid: false,
                error: textError
            });
        }
    });
};


module.exports = SearchFormValidation;