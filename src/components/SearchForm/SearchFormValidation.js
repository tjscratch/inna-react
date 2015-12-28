class SearchFormValidation {

    constructor(props) {
        super.constructor(props);
        this.toId = {
            key: 'toId',
            value: props.toId,
            valid: true,
            error: null
        };
        this.fromDate = {
            key: 'fromDate',
            value: props.fromDate,
            valid: true,
            error: null
        };
        this.toDate = {
            key: 'toDate',
            value: props.toDate,
            valid: true,
            error: null
        };
    }

    validation() {
        return required(this.toId, "Выберите город или страну, куда планируете поехать")
            .then((data)=> {
                return required(this.fromDate, "fromDate");
            })
            .then((data)=> {
                return required(this.toDate, "toDate");
            })
            .catch((data)=> {
                return data;
            })
    }

}


function required(obj, textError) {
    return new Promise((resolve, reject)=> {
        if (obj.value) {
            resolve(obj);
        } else {
            reject({
                key: obj.key,
                value: obj.value,
                valid: false,
                error: textError
            });
        }
    });
};


module.exports = SearchFormValidation;