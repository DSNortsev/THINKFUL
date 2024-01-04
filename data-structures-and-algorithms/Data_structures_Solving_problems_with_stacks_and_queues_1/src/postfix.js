// A simple algorithm may be outlined as follows:

// Import the necessary modules: path and Stack.
// Declare a constant named operator and assign an object with properties: +, -, *, and /, each corresponding to a function that takes two operands and returns the result of the corresponding operation.
// Declare a function named evaluate that takes an expression as a parameter.
// Create a new instance of the Stack class and assign it to a variable named stack.
// Remove any whitespace from the input expression.
// Iterate over each character in the expression and do the following:

// If the character is one of the operators +, -, *, or /:
// Pop the top two values from the stack (considered as right and left operands) and assign them to variables right and left.
// Apply the corresponding operator function to the operands and push the result back onto the stack.
// Otherwise (if the character is a number or operand):
// Push the character onto the stack.
// Convert the final result on the stack to a number and return it.
// Export the evaluate function for use in other modules.

const operators = {
    '+': (left, right) => left + right,
    '-': (left, right) => left - right,
    '*': (left, right) => left * right,
    '/': (left, right) => left / right,
};

const evaluate = (expression) => {
  const stack = [];
  const cleanedExpression = expression.replace(/\s+/g, '');
  
  for (const char of cleanedExpression) {
      if (operators.hasOwnProperty(char)){
        const right = Number(stack.pop());
        const left = Number(stack.pop());
        stack.push(operators[char](left, right));
      } else {
        stack.push(char);
      }  
  }
  return Number(stack.pop());
};

module.exports = evaluate;
