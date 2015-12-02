import siteUrls from '../constants/SiteUrls';

export function getPackagesSearchUrl(routeParams) {
    var { fromId, toId, fromDate, toDate, flightClass, adultCount, childAges } = routeParams;
    if (!childAges) {
        childAges = '';
    }
    //console.log('routeParams', routeParams);
    return `${siteUrls.SearchPackages}${fromId}-${toId}-${fromDate}-${toDate}-${flightClass}-${adultCount}-${childAges}`;
}