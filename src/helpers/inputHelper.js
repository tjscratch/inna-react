var ruLetters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
var latLetters = ['A', 'B', 'V', 'G', 'D', 'E', 'E', 'ZH', 'Z', 'I', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'KH', 'TS', 'CH', 'SH', 'SHCH', '', 'Y', '', 'E', 'IU', 'IA'];

export function transliterateAndToUpper(val) {
    //console.log('in transliterateAndToUpper', val);
    if (val) {
        val = val.toUpperCase();
        var res = [];
        for (var i = 0; i < val.length; i++) {
            var letter = val[i];
            var ix = ruLetters.indexOf(letter);
            if (ix > -1) {
                res.push(latLetters[ix]);
            }
            else {
                res.push(letter);
            }
        }
        val = res.join('');
    }

    //console.log('out transliterateAndToUpper', val);
    return val;
}