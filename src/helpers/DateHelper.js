import moment from 'moment';
//12.11.2015 to 2015-11-12
export function routeDateToApiDate (date) {
    if (date) {
        var parts = date.split('.');
        if (parts) {
            parts = parts.reverse();
        }
        return parts.join('-');
    }
    return null;
}

//15.12.2015
export function routeDateToJsDate(date) {
    if (date) {
        var parts = date.split('.');
        if (parts.length == 3) {
            //день
            var d = parseInt(parts[0], 10);
            //месяц (в js месяцы начинаются с 0)
            var m = parseInt(parts[1], 10) - 1;
            //год
            var y = parseInt(parts[2], 10);

            return new Date(y, m, d);
        }
    }
    return null;
}

//"2014-01-31T20:45:00"
export function apiDateToJsDate(dParam) {
    if (dParam != null) {
        //разделяем дату и время
        var parts = dParam.split('T');
        if (parts.length >=1) {
            var sDate = parts[0];

            //дата
            var dParts = sDate.split('-');
            if (dParts.length == 3) {
                //день
                var d = parseInt(dParts[2], 10);
                //месяц (в js месяцы начинаются с 0)
                var m = parseInt(dParts[1], 10) - 1;
                //год
                var y = parseInt(dParts[0], 10);

                if (parts.length == 2) {
                    var sTime = parts[1];

                    //время
                    var tParts = sTime.split(':');
                    if (tParts.length == 3) {
                        var h = parseInt(tParts[0], 10);
                        var mm = parseInt(tParts[1], 10);
                        var ss = parseInt(tParts[2], 10);

                        var res = new Date(y, m, d, h, mm, ss);
                        return res;
                    }
                    else {
                        return new Date(y, m, d);
                    }
                }
                else {
                    return new Date(y, m, d);
                }
            }
        }
    }

    return null;
}

export function addLeadZero(n) {
    return (+n) < 10 ? ('0' + n) : n;
}

export function toHHMM(date) {
    if (date) {
        return `${addLeadZero(date.getHours())}:${addLeadZero(date.getMinutes())}`;
    }

    return null;
}


var dtr = {
    translateMonthGenitive: function (n) {
        return [
            'января', 'февраля', 'марта',
            'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября',
            'октября', 'ноября', 'декабря'
        ][n]
    },

    translateMonth: function (n) {
        return [
            'Январь', 'Февраль', 'Март',
            'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь'
        ][n]
    },

    translateMonthEn: function (n) {
        return ["January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"][n]
    },

    translateMonthShort: function (n) {
        return [
            'янв', 'фев', 'мар',
            'апр', 'мая', 'июн',
            'июл', 'авг', 'сен',
            'окт', 'ноя', 'дек'
        ][n]
    },

    translateMonthShortEn: function (n) {
        return ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec"][n]
    },

    translateDayShort: function (n) {
        return ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][n]
    },

    translateDay: function (n) {
        return ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'][n]
    },

    translateDayEn: function (n) {
        return ["Monday","Tuesday","Wednesday","Thursday","Friday	","Saturday","Sunday"][n];
    },

    translateDayShortEn: function (n) {
        return ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][n];
    },
};

//15 ноя
export function dateToDDMMM(date) {
    if (date) {
        return `${date.getDate()} ${dtr.translateMonthShort(date.getMonth())}`
    }

    return null;
}

//15 ноя, вс
export function dateToDDMMMDay(date) {
    if (date) {
        return `${date.getDate()} ${dtr.translateMonthShort(date.getMonth())}, ${dtr.translateDayShort(date.getDay())}`
    }

    return null;
}

//15 ноя, вс
export function dateToDDMMMDayYear(date) {
    if (date) {
        return `${date.getDate()} ${dtr.translateMonthShort(date.getMonth())} ${moment(date).get('year')}, ${dtr.translateDayShort(date.getDay())}`
    }
    return null;
}

//05 ноября
export function dateToDDMMMM(date) {
    if (date) {
        return `${addLeadZero(date.getDate())} ${dtr.translateMonthGenitive(date.getMonth())}`
    }

    return null;
}

//155 -> 2 ч 35 мин
export function minutesToHHMM(seconds) {
    if (seconds != null) {
        //вычисляем сколько полных часов
        var h = Math.floor(seconds / 60);
        var addMins = seconds - h * 60;

        if (addMins == 0)
            return h + " ч";
        else if (h == 0)
            return addMins + " мин";
        else
            return h + " ч " + addMins + " мин";
    }
    return null;
}

export function getNightsCount(fromDate, toDate) {
    if (fromDate && toDate && fromDate <= toDate) {
        if (fromDate == toDate) {
            return 0;
        }

        var fDate = fromDate.getDate();
        var fMonth = fromDate.getMonth();
        var fYear = fromDate.getFullYear();

        var tDate = toDate.getDate();
        var tMonth = toDate.getMonth();
        var tYear = toDate.getFullYear();

        //если один день
        if (fDate == tDate && fMonth == tMonth && fYear == tYear) {
            return 0;
        }

        //если один год и месяц
        if (fMonth == tMonth && fYear == tYear) {
            return tDate - fDate;
        }

        var cur = new Date(fYear, fMonth, fDate);
        var end = new Date(tYear, tMonth, tDate);
        var nightsCount = 0;
        while(cur < end) {
            nightsCount++;
            //сл. день
            cur.setDate(cur.getDate() + 1);
        }
        return nightsCount;
    }

    return null;
}
