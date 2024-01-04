/**
 * Node is used to store values in a Queue
 */
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.first) {
      this.last.next = newNode;
    } else {
      // Set the node of the queue's next to be the new node
      this.first = newNode;
    }

    //make the new node the last item on the queue
    this.last = newNode;
  }

  dequeue() {
    if (this.first) {
      const dequeued = this.first;
      this.first = dequeued.next;

      if (dequeued === this.last) {
        this.last = null;
      }
      return dequeued.value;
    }
  }
  
//   dequeueElement(element) {
//     if (this.first === element) {
//       this.first = this.first.next;
//     } else {
//       const prev = this.first;
//       while (prev.next){
//         const current = prev.next;
//         if (current.value === element){
//           prev.next = current.next;
//           break;
//         }
//         prev = current;
//       }
//     }
 
//   }
  

  peek() {
    return this.first.value;
  }

  isEmpty() {
    return this.first === null;
  }
}

module.exports = Queue;
