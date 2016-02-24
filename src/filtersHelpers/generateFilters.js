export function generateFilters (filters) {
    let price = filters.Price;
    let stars = filters.Stars.List;
    let types = filters.HotelType.List;
    let taFactor = filters.TaFactor.List;
    let meal = filters.Meal.List;
    let extras = filters.Extra.List;

    let generateFiltersObj = {
        Price: {
            ...price,
            SelectedMin: price.Min,
            SelectedMax: price.Max
        },
        Stars: {},
        HotelType: {},
        TaFactor: {},
        Extra: {},
        Meal: {}
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

    function generateMeal (element) {
        generateFiltersObj.Meal[element.Order] = {
            Name: element.Name,
            Value: element.Order,
            Price: element.Price,
            Selected: false
        }
    }

    meal.forEach(generateMeal);

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
