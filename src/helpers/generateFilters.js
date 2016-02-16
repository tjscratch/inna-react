export function generateFilters (filters) {
  let stars = filters.Stars.List;
  let types = filters.HotelType.List;
  let taFactor = filters.TaFactor.List;

  let generateFiltersObj = {
    Stars: {},
    HotelType: {},
    TaFactor: {}
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

  return generateFiltersObj;
}
