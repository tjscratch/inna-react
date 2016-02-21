export function generateFilters (filters) {
    let stars = filters.Stars.List;
    let types = filters.HotelType.List;
    let taFactor = filters.TaFactor.List;
    let extras = filters.Extra.List;

    let generateFiltersObj = {
        Stars: {},
        HotelType: {},
        TaFactor: {},
        Extra: {}
    };

    function generateStars (element) {
        generateFiltersObj.Stars[element.Value] = {
            Value: element.Value,
            Price: element.Price,
            Selected: false
        }
    }

    stars.forEach(generateStars);

    function generateHotelType (element) {
        generateFiltersObj.HotelType[element.Value] = {
            Value: element.Value,
            Price: element.Price,
            Selected: false
        }
    }

    types.forEach(generateHotelType);

    function generateTaFactor (element) {
        generateFiltersObj.TaFactor[element.Value] = {
            Value: element.Value,
            Price: element.Price,
            Selected: false
        }
    }

    taFactor.forEach(generateTaFactor);

    function generateExtra (element) {
        generateFiltersObj.Extra[element.Value] = {
            Name: element.Name,
            Value: element.Value,
            Price: element.Price,
            Selected: false
        }
    }

    extras.forEach(generateExtra);

    return generateFiltersObj;
}
