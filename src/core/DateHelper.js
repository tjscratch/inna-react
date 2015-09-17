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