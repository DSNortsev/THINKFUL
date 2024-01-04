/**
 * Return true if some permutation of this word is a palindrome
 * @param {string} word The word to check
 */
function permutationPalindrome(word) {
  const cleanWord = word.replace(/\s/g, '').toLowerCase();
  
  const frequency = new Map();
  
  for (const letter of cleanWord){
    frequency.set(letter, (frequency.get(letter) || 0) + 1); 
  }
  let oddCounts = 0;
  for (const count of frequency.values()){
    if (count % 2 !== 0) {
      oddCounts++;
    }
  }
  return oddCounts <= 1;
}

module.exports = permutationPalindrome;
