/**
 * Returns the string with the characters in reverse order
 * @param {string} text the string to be reversed
 */

// Write a function that reverses a string. Take a string as input, reverse the string, and return the new string. For example, given the string "thinkful", return the string "lufkniht".
function reverse(text) {
 if (text.length <= 1) {
   return text;
 }
 return  reverse(text.slice(1)) + text[0];
}

module.exports = reverse;
