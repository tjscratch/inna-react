export function generateFilters (filters) {
  console.log('start generateFilters');
  let stars = filters.Stars.List;
  let generateFiltersObj = {
    Stars: {}
  };

  function generateStars (element, index, array) {
    generateFiltersObj.Stars[element.Value] = {
      Value: element.Value,
      Price: element.Price,
      Selected: false
    }
  }

  stars.forEach(generateStars);

  return generateFiltersObj;
}
