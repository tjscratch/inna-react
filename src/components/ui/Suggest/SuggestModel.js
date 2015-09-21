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

    focusOptionItem: function (options, itemIndex) {
        var focusedItems = options.map(function (item, index) {
            if (itemIndex == index) {
                item.selected = true;
            } else {
                item.selected = false;
            }
            return item;
        });
        return focusedItems;
    },

    selectedKeyDown: function (optionCounter, options, keyKode) {
        var counter = optionCounter;
        var maxCount = options.length - 1;
        switch (keyKode) {
            // стрелка вниз
            case 40:
                counter = inc(counter, maxCount, 1);
                break;
            // стрелка вверх
            case 38:
                counter = inc(counter, maxCount, -1);
                break;
            // enter
            case 13:
                counter = inc(counter, maxCount, -1);
                break;

        }


        function inc(counter, maxCounter, inc) {
            
            if (inc > 0) {
                if (counter == maxCounter) {
                    counter = 0;
                } else if (counter <= maxCounter) {
                    counter += inc;
                }
            }

            if (inc < 0) {
                if (counter == 0) {
                    counter = maxCounter;
                } else if (counter > 0 & counter <= maxCount) {
                    counter += inc;
                }
            }

            return counter;
        }

        return counter;
    },

    get: function () {
        return 3456;
    }


}
module.exports = SuggestModel;