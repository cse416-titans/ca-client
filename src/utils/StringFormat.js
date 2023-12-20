export function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export function convertToPercentageString(num) {
  return `${Math.round(num * 100)}%`;
}

export function convertToRatioPercents(num1, num2) {
  return `${parseFloat((num1 / num2) * 100).toFixed(2)}%`;
}

export function toFixed2(num) {
  return parseFloat(num).toFixed(2);
}

export function toFixed1(num) {
  return parseFloat(num).toFixed(1);
}

export function convertToStringSplitFromArrays(arr1, arr2) {
  const s1 = Array.from(arr1).length;
  const s2 = Array.from(arr2).length;
  return `${s1}-${s2}`;
}
