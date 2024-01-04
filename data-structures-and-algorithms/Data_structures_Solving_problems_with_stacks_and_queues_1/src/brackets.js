const Stack = require("./lib/stack");

// Recall the algorithm that was used to determine if a given expression contained matching parentheses. It is repeated in pseudocode below:

// Initialize a new empty stack
// Start a loop to iterate through each character in the expression
// If the current character is (
// Push it onto the stack
// Else
// If the current character is (
// If the stack is not empty
// Pop one item off the stack
// Else
// Return false
// If the stack is empty
// Return true
// Else
// Return false
// Extend the algorithm to recognize 3 different types of brackets: (), [], and {}. These must be correctly nested; "([)]" is incorrect and should return false.

const brackets = {
  '(': ')',
  '[': ']',
  '{': '}'
}

const match = (expression) => {
  const stack = [];
  for (const char of expression){
    if (brackets[char]) {
      // If it's an opening bracket
      stack.push(char);
    } else if (Object.values(brackets).includes(char)) {
      if (stack.length === 0) {
        // Stack is empty
        return false;
      }
      const popped = stack.pop();
      if (brackets[popped] !== char ){
        return false;
      }
    }
 
  }
  // Check if the stack is empty at the end
  return stack.length === 0  
};

module.exports = match;
