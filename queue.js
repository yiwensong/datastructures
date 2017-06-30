/**
 * queue.js
 *
 * Basic queue implementation.
 */

/**
 * Makes an empty queue.
 */
function Queue() {
  this.head = undefined;
  this.tail = undefined;
  this.size = 0;
};


/**
 * Adds an item to the back of the queue.
 *
 * @param   item    the item to add.
 */
Queue.prototype.enqueue = function(item) {
  var entry = [item, undefined];
  if (this.size == 0) {
    this.head = entry;
    this.tail = entry;
  } else {
    this.tail[1] = entry;
    this.tail = entry;
  }
  this.size++;
};


/**
 * Returns and removes the first item in the queue.
 */
Queue.prototype.dequeue = function() {
  if (this.size < 1) {
    return undefined;
  }
  var entry = this.head;
  this.head = this.head[1];
  this.size--;
  return entry[0];
};


/**
 * Returns the first item in the queue.
 */
Queue.prototype.peek = function() {
  if (this.size < 1) {
    return undefined;
  }
  return this.head[0];
};


/**
 * Testing for the queue.
 */
Queue.prototype.test = function() {
  for (var i=0;i<100;i++) {
    this.enqueue(i);
  }
  for (var i=0;i<100;i++) {
    console.log(this.dequeue());
  }
  for (var i=0;i<100;i++) {
    if (i%4 == 3) {
      console.log(this.dequeue());
    } else {
      this.enqueue(i);
    }
  }
  for (var i=0;i<100;i++) {
    console.log(this.dequeue());
  }
};

module.exports = Queue;
