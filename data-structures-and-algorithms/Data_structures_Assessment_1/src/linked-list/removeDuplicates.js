/**
 * Remove duplicate values, if any, from a sorted linked list.
 *
 * The algorithm should be O(n) time complexity, therefore it cannot use `find()`.
 *
 * @param sortedLinkedList
 *  a possibly empty link list with all values in lexical order.
 *
 * @returns {LinkedList}
 *  the original linked list with any duplicate values removed.
 */

function removeDuplicates(sortedLinkedList) {
  // TODO: implement an algorithm to remove duplicate values from a sorted linked list.
  let current = sortedLinkedList.head;
  
  while (current && current.next) {
    if (current.value === current.next.value){
      current.next = current.next.next; // Skip the duplicate node
    } else {
      current = current.next;  // Move to the next node
    }
  }
  return sortedLinkedList;
}

module.exports = removeDuplicates;
