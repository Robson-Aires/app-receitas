export const apiIngredient = async (ingredient) => {
  if (ingredient) {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const response = await request.json();
    return response;
  }
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = await request.json();
  return response;
};

export const apiName = async (name) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await request.json();
  return response;
};

export const apiFirstLetter = async (firstLetter) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const response = await request.json();
  return response;
};
