class SearchFormValidation {

    constructor(props) {
        super.constructor(props);
        this.fromId = {
            key: 'fromId',
            value: props.fromId,
            valid: true,
            error: null
        };
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
        return required(this.fromId, "Введите город отправления")
            .then((data)=> {
                return required(this.toId, "Выберите город или страну, куда планируете поехать");
            })
            .then((data)=> {
                return required(this.fromDate, "Выберите дату отправления туда");
            })
            .then((data)=> {
                return required(this.toDate, "Выберите дату отправления обратно");
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

/**
 * Сравнение равенства v1 и v2
 * @param v1
 * @param v2
 * @param error
 * @param errorText
 */
function noEqual(obj1, obj2, objName, errorText) {
    var deferred = $q.defer();
    var returnObj = {};
    if (obj1 != obj2) {
        returnObj['success'] = true;
        deferred.resolve(returnObj);
    } else {
        returnObj['success'] = false;
        returnObj['name'] = objName;
        returnObj['error'] = errorText;
        deferred.reject(returnObj);
    }
    return deferred.promise;
}


module.exports = SearchFormValidation;