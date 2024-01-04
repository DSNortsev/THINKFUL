/**
 * Implement an algorithm that sorts the array then returns the minimum and maximum.
 */
function minimumAndMaximumSort(numbers) {
  if (Array.isArray(numbers) & numbers.length > 0){
    const sortedNumbers = numbers.slice().sort((a,b) => a - b);
    return [sortedNumbers[0], sortedNumbers[sortedNumbers.length - 1]]
  }
  return []
}

/**
 * Implement an algorithm that uses iteration to find the minimum and maximum.
 */
function minimumAndMaximumIterate(numbers) {
  let minNumber = Number.POSITIVE_INFINITY;
  let maxNumber = Number.NEGATIVE_INFINITY;
  if (Array.isArray(numbers) & numbers.length > 0) {
    for (const number of numbers) {
      if (number > maxNumber) {
        maxNumber = number;
      }
      if (number < minNumber) {
        minNumber = number;
      }
    }
    return [ minNumber, maxNumber ];
  }
  return [];
}

module.exports = { minimumAndMaximumIterate, minimumAndMaximumSort };
