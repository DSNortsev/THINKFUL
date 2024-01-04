/**
 * Return the first character in the string that occurs only once.
 * @param {string} word the string to be analysed
 */
function firstSingleCharacter(word) {
  const cleanedWord = word.replace(/\s/sg, '').toLowerCase()
  
  const count = new Map();
  
  for (const letter of cleanedWord){
    count.set(letter, (count.get(letter) || 0) + 1);
  }
  
  for (const letter of cleanedWord){
    if (count.get(letter) === 1){
      return letter;
    }
  }
  return null;
}

module.exports = firstSingleCharacter;
