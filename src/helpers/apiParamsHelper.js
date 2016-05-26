import { routeDateToApiDate } from '../helpers/DateHelper';

export function getParamsForHotelDetails(routeParams, roomId) {
    var filter = {
        'Filter[DepartureId]': routeParams.fromId,
        'Filter[ArrivalId]': routeParams.toId,
        'Filter[StartVoyageDate]': routeDateToApiDate(routeParams.fromDate),
        'Filter[EndVoyageDate]': routeDateToApiDate(routeParams.toDate),
        'Filter[TicketClass]': routeParams.flightClass,
        'Filter[Adult]': routeParams.adultCount,
        'Filter[Children]': routeParams.childAges,
        'Filter[HotelId]': routeParams.hotelId,
        'Filter[TicketId]': routeParams.ticketId,
        'Filter[TicketBackId]': routeParams.ticketBackId,
        'Filter[ProviderId]': routeParams.providerId
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
        //TicketClass: routeParams.flightClass,
        //Rooms: true,
        ...filter
    };

    if (roomId) {
        params.Rooms = true;
    }

    return params;
}

export function getParamsForCheckAvailability(routeParams, roomId) {
    var filter = {
        'Filter[DepartureId]': routeParams.fromId,
        'Filter[ArrivalId]': routeParams.toId,
        'Filter[StartVoyageDate]': routeDateToApiDate(routeParams.fromDate),
        'Filter[EndVoyageDate]': routeDateToApiDate(routeParams.toDate),
        'Filter[TicketClass]': routeParams.flightClass,
        'Filter[Adult]': routeParams.adultCount
    };
    if (routeParams.childAges) {
        filter['Filter[ChildrenAges][]'] = routeParams.childAges.split('_');
    }

    var params = {
        HotelId: routeParams.hotelId,
        HoteProviderId: routeParams.providerId,//пиздец блять!! в слове L пропущена, ебаное api
        TicketToId: routeParams.ticketId,
        TicketBackId: routeParams.ticketBackId,
        TicketClass: routeParams.flightClass,
        Rooms: roomId,
        ...filter
    };

    return params;
}

export function getParamsForMakeReservation(routeParams, roomId, formData) {
    var phone = formData.phone;
    if (!phone) {
        phone = formData.phone_suffix + formData.phone_number;
    }

    var passengers = [];
    formData.passengers.forEach((p, ix)=>{
        var pas = {
            "Sex": p.gender,
            "I": p.name,
            "F": p.lastName,
            "Birthday": p.birth,
            "DocumentId": p.docType,
            "Number": p.docNumber,
            "ExpirationDate": p.docExpires,
            "Citizen": p.citizenship,
            "Index": ix
        };
        passengers.push(pas);
    });

    var filter = {
        'DepartureId': routeParams.fromId,
        'ArrivalId': routeParams.toId,
        'StartVoyageDate': routeDateToApiDate(routeParams.fromDate),
        'EndVoyageDate': routeDateToApiDate(routeParams.toDate),
        'TicketClass': routeParams.flightClass,
        'Adult': routeParams.adultCount
    };
    if (routeParams.childAges) {
        //filter['Filter[ChildrenAges][]'] = routeParams.childAges.split('_');
        filter.ChildrenAges = [...routeParams.childAges.split('_')];
    }

    var params = {
        "Email": formData.email,
        "Agree": formData.Agree,
        "Phone": phone,
        "IsSubscribe": false,
        "Passengers": passengers,
        "IsNeededVisa": false,
        "IsNeededTransfer": false,
        "IsNeededMedicalInsurance": false,
        "SearchParams": {
            "HotelId": routeParams.hotelId,
            "HotelProviderId": routeParams.providerId,
            "TicketToId": routeParams.ticketId,
            "TicketBackId": routeParams.ticketBackId,
            "TicketClass": routeParams.flightClass,
            "RoomId": roomId,
            "Filter": filter,
            "CustomerWishlist": ""
        },
        "PartnerMarker": null
    };

    return params;

    /*
     I:
     F:
     Email:diamondliquid@gmail.com
     Phone:+79265898012
     IsSubscribe:false
     Passengers[0][Sex]:1
     Passengers[0][I]:ALEXANDER
     Passengers[0][F]:SVESHNIKOV
     Passengers[0][Birthday]:01.01.1983
     Passengers[0][DocumentId]:1
     Passengers[0][Number]:123123312
     Passengers[0][ExpirationDate]:01.01.2020
     Passengers[0][Citizen]:189
     Passengers[0][Index]:0
     IsNeededVisa:false
     IsNeededTransfer:false
     IsNeededMedicalInsurance:false
     SearchParams[HotelId]:435490
     SearchParams[HotelProviderId]:4
     SearchParams[TicketToId]:801128014
     SearchParams[TicketBackId]:801128107
     SearchParams[RoomId]:1bbd4a9c-f016-95b2-c6e4-5b5b4f8f9d8b
     SearchParams[Filter][ProviderId]:4
     SearchParams[Filter][DepartureId]:6733
     SearchParams[Filter][ArrivalId]:6623
     SearchParams[Filter][StartVoyageDate]:2016-04-01
     SearchParams[Filter][EndVoyageDate]:2016-04-15
     SearchParams[Filter][TicketClass]:0
     SearchParams[Filter][Adult]:1
     :
     SearchParams[CustomerWishlist]:
     PartnerMarker:
    * */
}
