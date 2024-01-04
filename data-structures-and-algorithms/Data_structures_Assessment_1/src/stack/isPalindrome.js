/**
 * A palindrome is a word, phrase, or number that is spelled the same forward and backward.
 * For example, “dad” is a palindrome; “A man, a plan, a canal: Panama” is a palindrome if you take out the spaces and ignore the punctuation;
 * and 1,001 is a numeric palindrome.
 *
 * Use a stack to determine whether or not a given string is a palindrome.
 *
 * The implementation should have O(n) performance.
 *
 * @param text
 *  a possibly empty string that may be a palindrome.
 */

const Stack = require("../stack/stack");

function isPalindrome(text) {
  const cleanText = text.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  const middle = Math.floor(cleanText.length / 2);
  
   // Initialize a new stack
  const stack = new Stack();
  
  if (!cleanText){
    return false;
  }

  // TODO: Write an O(n) algorithm that uses a stack to determine whether the given input text is palindrome or not.
  for (let index=0; index < middle; index++){
    stack.push(cleanText[index])
  }
  
  const startIndex = middle + (cleanText.length % 2)
  for (let index=startIndex; index <cleanText.length; index++){
    if (cleanText[index] !== stack.pop()){
      return false;
    }
  }
  
  return true;
}

module.exports = isPalindrome;
