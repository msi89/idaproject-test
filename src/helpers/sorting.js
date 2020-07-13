export const sortByName = (a, b) => {
  if (a.product < b.product) {
    return -1;
  }
  if (a.product > b.product) {
    return 1;
  }
  return 0;
};

export const sortByCalories = (a, b) => {
  if (a.calories < b.calories) {
    return -1;
  }
  if (a.calories > b.calories) {
    return 1;
  }
  return 0;
};

export const sortByFat = (a, b) => {
  if (a.fat < b.fat) {
    return -1;
  }
  if (a.fat > b.fat) {
    return 1;
  }
  return 0;
};

export const sortByCarbs = (a, b) => {
  if (a.carbs < b.carbs) {
    return -1;
  }
  if (a.carbs > b.carbs) {
    return 1;
  }
  return 0;
};

export const sortByProtein = (a, b) => {
  if (a.protein < b.protein) {
    return -1;
  }
  if (a.protein > b.protein) {
    return 1;
  }
  return 0;
};

export const sortByIron = (a, b) => {
  if (a.iron < b.iron) {
    return -1;
  }
  if (a.iron > b.iron) {
    return 1;
  }
  return 0;
};

export function sortProduct(index) {
  switch (index) {
    case 0:
      return sortByName;
    case 1:
      return sortByCalories;
    case 2:
      return sortByFat;
    case 3:
      return sortByCarbs;
    case 4:
      return sortByProtein;
    case 5:
      return sortByIron;

    default:
      return sortByName;
  }
}
