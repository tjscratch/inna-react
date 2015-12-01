import { routeDateToApiDate } from '../helpers/DateHelper';

export function getParamsForHotelDetails(routeParams, roomId) {
    var filter = {
        'Filter[DepartureId]': routeParams.fromId,
        'Filter[ArrivalId]': routeParams.toId,
        'Filter[StartVoyageDate]': routeDateToApiDate(routeParams.fromDate),
        'Filter[EndVoyageDate]': routeDateToApiDate(routeParams.toDate),
        'Filter[TicketClass]': routeParams.flightClass,
        'Filter[Adult]': routeParams.adultCount,
        'Filter[Children]': routeParams.childAges
    };
    if (routeParams.childAges) {
        filter['Filter[ChildrenAges][]'] = routeParams.childAges.split('_');
    }

    if (roomId) {
        filter['Filter[RoomId]'] = roomId;
    }

    var params = {
        HotelId: routeParams.hotelId,
        HotelProviderId: routeParams.providerId,
        TicketToId: routeParams.ticketId,
        TicketBackId: routeParams.ticketBackId,
        //Rooms: true,
        ...filter
    };

    if (roomId) {
        params.Rooms = true;
    }

    return params;
}