import config from '../config';

export function urlToInnaSearch(locationId) {
    return config.offerUrl.replace('{locationId}', locationId);
}