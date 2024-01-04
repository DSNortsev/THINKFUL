/**
 * Return true if s1 is an anagram of s2
 * @param {string} s1
 * @param {string} s2
 */
function anagram(s1, s2) {
  // Replace spaces and set to lower cases
  const cleanedS1 = s1.replace(/\s/g, '').toLowerCase();
  const cleanedS2 = s2.replace(/\s/g, '').toLowerCase();
  
  if (s1.length !== s2.length){
    return false;
  }
  
  const count = new Map();
  
  for (const letter of cleanedS1){
    count.set(letter, (count.get(letter) || 0) + 1);
  }
  
  for ( const letter of cleanedS2 ){
    if (!count.get(letter) || count.get(letter) === 0){
      return false;
    }
    count.set(letter, count.get(letter) - 1);
  }
  return true;
}

module.exports = anagram;
