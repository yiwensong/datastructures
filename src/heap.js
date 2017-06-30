/**
 * heap.js
 *
 * it's incredible that no one made a fucking easy to find
 * heap implementation for javascript.
 */

const EXPAND_RATIO = .75;
const CONTRACT_RATIO = .25;
const MIN_SIZE = 64;

/**
 * Makes an empty heap. All heaps are min heaps. Deal with it.
 *
 * @param   items       a list of items to add.
 * @param   priorities  a list of priorities.
 */
function Heap(items, priorities) {
  if (items == undefined) {
    this.data = new Array(MIN_SIZE);
    this.size = 0;
    return;
  }
  if (items.length != priorities.length) throw 'array length mismatch';
  this.size = items.length;
  this.data = new Array(Math.ceil(Math.log(this.length)/Math.log(2)));
  // Initialize
  for (var i=0;i<this.size;i++) {
    this.data[i] = [items[i], priorities[i]];
  }
  // Push the fatties down
  for (var i=this.size-1;i>=0;i--) {
    this.parentswap(i);
  }
};


/**
 * Given an array, swaps index i with mom, which is
 * Math.floor((i-1)/2), if mom is bigger.
 *
 * @param   i   the index of the item to swap.
 */
Heap.prototype.parentswap = function (i) {
  var mom = Math.floor((i-1)/2);
  if (this.data[i][1] < this.data[mom][1]) {
    var tmp = this.data[i];
    this.data[i] = this.data[mom];
    this.data[mom] = tmp;
  }
};


/**
 * Adds an item into the heap.
 *
 * @param   item      the item to add.
 * @param   priority  the priority of said item.
 */
Heap.prototype.enqueue = function (item, priority) {
  if (this.data.length * EXPAND_RATIO < this.size + 1) {
    this.data = this.data.concat(new Array(this.data.length));
  }
  this.data[this.size] = [item, priority];
  var i = this.size;
  while (i != 0) {
    this.parentswap(i);
    i = Math.floor((i-1)/2);
  }
  this.size++;
};


/**
 * Returns and removes the front of the heap.
 */
Heap.prototype.dequeue = function () {
  if (this.data.length * CONTRACT_RATIO > this.size - 1 
      && this.data.length > MIN_SIZE) {
    this.data = this.data.slice(0, this.data.length/2);
  }
  var entry = this.data[0][0];
  var i = 0;
  this.data[0] = this.data[this.size - 1];
  this.data[this.size - 1] = undefined;
  while (1) {
    var left = (i+1)*2 - 1;
    var right = (i+1)*2;
    if ((left > this.size-2 || this.data[i][1] < this.data[left][1])
          && (right > this.size-2 || this.data[i][1] < this.data[right][1])) {
      break;
    } else if (right > this.size-2 || this.data[left][1] < this.data[right][1]) {
      this.parentswap(left);
      i = left;
    } else {
      this.parentswap(right);
      i = right;
    }
  }
  this.size--;
  return entry;
};


/**
 * Returns and removes the front of the heap. Also returns the
 * priority of the item.
 */
Heap.prototype.better_dequeue = function () {
  var priority = this.data[0][1];
  return [priority, this.dequeue()];
};


/**
 * Returns the first item of the heap.
 */
Heap.prototype.peek = function () {
  if (this.size < 1) return undefined;
  return this.data[0][0];
};


Heap.prototype.test = function () {
  for (var i=0;i<100;i++) {
    this.enqueue(i,i);
  }
  for (var i=0;i<100;i++) {
    // console.log(this);
    result = this.dequeue();
    console.log(result);
    if (result != i) throw 'something is wrong!!! ' + i + ' '  + result;
  }

  for (var i=0;i<100;i++) {
    var p = (i*7919 + 7841) % 1861;
    this.enqueue(i,p);
  }
  for (var i=0;i<100;i++) {
    console.log(this.better_dequeue());
  }
};

module.exports = Heap;
