export function generateFilters (filters) {
  let stars = filters.Stars.List;
  let types = filters.HotelType.List;

  let generateFiltersObj = {
    Stars: {},
    HotelType: {}
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

  return generateFiltersObj;
}
