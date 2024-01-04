/**
 * A sort algorithm that implements a stable sort
 * @param {function} compare The comparator function used in sorting
 * @param {array} elements The array to be sorted
 */
function sort(compare, elements) {
  if (Array.isArray(elements)) {
    if(elements.length <= 1) {
      return elements;
    }
    const middle = Math.floor(elements.length / 2);
    
    const leftElements = elements.slice(0, middle);
    const rightElements = elements.slice(middle);
    
    const leftElementsSorted = sort(compare, leftElements);
    const rightElementsSorted = sort(compare, rightElements);
    
    return merge(compare, leftElementsSorted, rightElementsSorted);
  }
  return elements;
}

function merge(compare, left, right){
  const sorted = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length){
    const comparison = compare(left[leftIndex], right[rightIndex]);
    
    if (comparison <= 0) {
      sorted.push(left[leftIndex]);
      leftIndex++;
    } else {
      sorted.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return sorted.concat( 
    leftIndex < left.length ? left.slice(leftIndex) : right.slice(rightIndex)
  );
}

module.exports = sort;
