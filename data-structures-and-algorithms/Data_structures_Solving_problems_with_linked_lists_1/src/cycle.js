const cycle = (list) => {
  let slowPointer = list.head;
  let fastPointer = list.head;
  
  if (list.head === null || list.head.next === null) {
    // Check if list is empty or has just one node
    return false;
  }
  
  while(slowPointer !== null && fastPointer.next !== null){
   
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
    if (slowPointer === fastPointer){
      return true;
    }
  }
  
  // No Cycle found
  return false;
};

module.exports = cycle;
