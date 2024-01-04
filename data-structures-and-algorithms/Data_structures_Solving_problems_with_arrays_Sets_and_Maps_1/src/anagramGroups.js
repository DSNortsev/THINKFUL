/**
 * Return a grouping of words by whether they are anagrams of each other or not
 * @param {array} words to be grouped
 */
function anagramGroups(words) {
  const results = new Map();
  
  for (const word of words){
    if (word) {
      const uniqLetters = [...new Set(word)].sort().join('');
      if (results.has(uniqLetters)){
        results.get(uniqLetters).push(word)
      } else {
        results.set(uniqLetters, [word])
      }
    }
  }
  return [...results.values()];
}

module.exports = anagramGroups;
