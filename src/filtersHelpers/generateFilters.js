export function generateFilters (filters) {
    let price = filters.Price;
    let hotelName = filters.HotelName;
    let stars = filters.Stars.List;
    let types = filters.HotelType.List;
    let taFactor = filters.TaFactor.List;
    let meal = filters.Meal.List;
    let extras = filters.Extra.List;

    let generateFiltersObj = {
        Price: {
            ...price,
            SelectedMin: price.Min,
            SelectedMax: price.Max,
            label: 'Цена',
            systemName: 'Price'
        },
        Stars: {},
        HotelType: {},
        HotelName: {
          ...hotelName,
          value: hotelName,
          label: 'Название',
          systemName: 'HotelName'
        },
        TaFactor: {},
        Extra: {},
        Meal: {}
    };

    function generateStars (element) {
        generateFiltersObj.Stars[element.Value] = {
            Value: element.Value,
            Price: element.Price,
            Selected: false,
            label: 'Звезды',
            systemName: 'Stars'
        }
    }

    stars.forEach(generateStars);

    function generateHotelType (element) {
        generateFiltersObj.HotelType[element.Value] = {
            Value: element.Value,
            Price: element.Price,
            Selected: false,
            label: 'Тип',
            systemName: 'HotelType'
        }
    }

    types.forEach(generateHotelType);

    function generateTaFactor (element) {
        generateFiltersObj.TaFactor[element.Value] = {
            Value: element.Value,
            Price: element.Price,
            Selected: false,
            label: 'Рейтинг',
            systemName: 'TaFactor'
        }
    }

    taFactor.forEach(generateTaFactor);

    function generateMeal (element) {
        generateFiltersObj.Meal[element.Order] = {
            Name: element.Name,
            Value: element.Order,
            Price: element.Price,
            Selected: false,
            label: 'Питание',
            systemName: 'Meal'
        }
    }

    meal.forEach(generateMeal);

    function generateExtra (element) {
        generateFiltersObj.Extra[element.Value] = {
            Name: element.Name,
            Value: element.Value,
            Price: element.Price,
            Selected: false,
            label: 'Сервисы',
            systemName: 'Extra'
        }
    }

    extras.forEach(generateExtra);

    return generateFiltersObj;
}
