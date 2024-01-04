// An algorithm that uses a queue to solve the problem is given below.

// Initialize an empty queue.
// Enqueue the string 1. This represents binary number 1.
// Initialize an empty array named result.
// Iterate from 1 to max and do the following:
// Dequeue a value from the queue.
// Push the value into result.
// Append a 0 to the value and enqueue it.
// Append a 1 to the value and enqueue it.
// Return result.

const binary = (max) => {
  const queue = [];
  const result = [];
  
  // Enqueue the string '1'. This represents binary number 1.
  queue.push('1');
  for (let i = 1; i <= max; i++){
    const currentValue = queue.shift();
    result.push(currentValue);
    
    // Append a 0 to the value and enqueue it
    const newValueWithZero = currentValue + '0';
    queue.push(newValueWithZero);

    // Append a 1 to the value and enqueue it
    const newValueWithOne = currentValue + '1';
    queue.push(newValueWithOne);
  }
  return result;
};

module.exports = binary;
