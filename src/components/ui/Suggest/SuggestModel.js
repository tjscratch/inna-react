import api from '../../../core/ApiClient';
import apiUrls from '../../../constants/ApiUrls.js';

var SuggestModel = {

    getSuggest: function (string) {
        let params = {term: string.trim()};
        return new Promise((resolve, reject)=> {
            api.get(apiUrls.DictionaryHotel, params)
                .then((data)=> {
                    resolve(data);
                });
        });
    },

    get: function () {
        return 3456;
    }


}
module.exports = SuggestModel;