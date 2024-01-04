/**
 * Implement a brute force algorithm for finding the missing number in an array.
 */
function missingNumberBruteForce(numbers) {
    for (let number = 1; number <= numbers.length + 1; number++){
      if (!numbers.includes(number)){
        return number;
      }  
    }
  return -1
}

/**
 * Use an iterative  strategy for finding the missing number in an array.
 */
function missingNumberSum(numbers) {
  const n = numbers.length + 1;
  const expectedSums = (n * (n + 1) / 2)
  const actualSums = numbers.reduce((a, b) => a + b, 0);
  return expectedSums - actualSums;
  
}

module.exports = { missingNumberBruteForce, missingNumberSum };
