const LinkedList = require("./lib/linkedList");

class Editor {
  /**
   * Constructs a new Editor object with the given text.
   * Defaults to empty text. Cursor is positioned at the end of the text.
   * @param {LinkedList} text - A linked List containing the characters that are in the editor,
   * empty by default
   */
  constructor(text = new LinkedList()) {
    this.text = text;
    this.cursor = this.text.find(
      (node, index) => index === this.text.length - 1
    );
  }

  /**
   * Insert a character at the cursor position of the editor.
   * @param {*} char a value to be inserted into the editor
   * @returns {Editor} a reference to this editor
   */
  insert(char) {
//     const newNode = new LinkedList.Node(char);
    
    if (!this.text.head){
      // If the editor is empty, insert the character in the head
      this.text.insert(char);
      this.cursor = this.text.head;
    } else if (!this.cursor){
      this.text.insertAtHead(char);
      this.cursor = this.text.head;
    } else {
       this.text.insert(char, (node, index) => node === this.cursor);
       this.cursor = this.cursor.next;
    }
    return this;
  }

  /**
   * Remove the character at the cursor position.
   * Moves the cursor to the previous position.
   * If editor is empty does nothing.
   * @returns {Editor} a reference to this editor
   */
  delete(char) {
    // When Editor or coursor is empty/null
    if (!this.text.head || !this.cursor){
      return this
    }
    
    if (this.cursor === this.text.head){
       // If the cursor is at the head, move the head to the next node
      this.text.head = this.text.head.next;
      this.cursor = null;
    } else {
      // find the node before the cursor
      const [matchedNode, previousNode] = this.text.findWithPrevious((node, index) => node === this.cursor);
      previousNode.next = this.cursor.next;
      this.cursor = previousNode;
    }
    
    
    return this;
  }

  /**
   * Moves the cursor one position to the left.
   * If the cursor is at the start of the editor nothing happens.
   * @returns {Editor} a reference to this editor
   */
  arrowLeft() {
    if (!this.cursor){
      // Cursor is at the start
      return this;
    }
    
    if (this.cursor === this.text.head) {
      // Cursor at the head
      this.cursor = null;
    } else {
      const [matchedNode, previousNode] = this.text.findWithPrevious((node, index) => node === this.cursor);
      this.cursor = previousNode;
    }
    return this;
  }

  /**
   * Moves the cursor one position to the right.
   * If the cursor is at the end of the editor nothing happens.
   * @returns {Editor} a reference t this editor
   */
  arrowRight() {
    if (!this.text.head){
      // Edit is empty
      return this;
    } 
    
   if (!this.cursor){
     // Cursor is at the start
     this.cursor = this.text.head;
   } else if (this.cursor.next) {
     this.cursor = this.cursor.next;
    }
    return this;
  }
}

module.exports = Editor;
