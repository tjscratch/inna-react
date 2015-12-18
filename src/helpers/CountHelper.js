export function pluralize(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export function numOrder(number) {
    switch (number) {
        case 1: return 'Первый';
        case 2: return 'Второй';
        case 3: return 'Третий';
        case 4: return 'Четвертый';
        case 5: return 'Пятый';
        case 6: return 'Шестой';
        case 7: return 'Седьмой';
        case 8: return 'Восьмой';
        case 9: return 'Девятый';
    }
}