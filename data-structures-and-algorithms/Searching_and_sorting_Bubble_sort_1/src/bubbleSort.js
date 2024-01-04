function bubbleSort(compare, elements) {
  if (Array.isArray(elements)){
    let inOrder;
    do {
      inOrder = true; // Assuming that an array is sorted
      for (let index = 0; index < elements.length - 1; index++) {
        const leftElement = elements[index];
        const rightElement = elements[index + 1];
        if (compare(leftElement, rightElement) > 0) {
          elements[index] = rightElement;
          elements[index + 1] = leftElement;
          inOrder = false; // The array wasn't in order, so swap elements and then check it again.
        }
      }
    } while (inOrder === false)
  }
  return elements;
}

module.exports = bubbleSort;
