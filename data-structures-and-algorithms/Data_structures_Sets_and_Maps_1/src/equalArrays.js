/**
 * return true if two arrays are equal, false otherwise
 */
function isEqual(a1, a2) {
  
  if (a1.length !== a2.length) {
    return false;
  }
  
  const count = new Map();
  
  for (const number of a1 ) {
    count.set(number, (count.get(number) || 0) + 1);
  }
  
  for (const number of a2) {
    if (!count.has(number) || count.get(number) === 0){
      return false;
    }
    count.set(number, count.get(number) - 1);
  }
  return true;
}

module.exports = isEqual;
