'use strict';


/**
 * initialize rpn.js
 *
 * @constructor
 */
var rpn = exports = module.exports = function() {
  this._operations = {
    '+': this.plus,
    '-': this.minus,
    '*': this.multiply,
    '/': this.divide
  };
  this._stack = [];
};


/**
 * add numbers to the stack and performs the right operation on them
 *
 * @param {array<number>} nums list of numbers to calculate with
 * @param {function(nums)} operation function to perform the correct operation
 * @return {object} just return myself
 */
rpn.prototype._add = function(nums, operation) {
  nums.forEach(function(num, index) {
    num = parseInt(num, 10);

    if (isNaN(num) === true) {
      throw new Error('argument ' + index + ' is not a number');
    }
  }, this);

  if (nums.length > 0) {
    this._stack.push(operation.bind(this)(nums));
  } else {
    this._stack = [operation.bind(this)(this._stack)];
  }

  return this;
};


/**
 * calculation with the help of a complete rpn formula
 *
 * @param {string} formula
 * @return {number} the result
 */
rpn.prototype.calc = function(formula) {
  var stack = []; // short time stack for single operations
  formula = formula.split(' '), // split by space

  formula.forEach(function(part, index) {
    var numPart = parseInt(part, 10);

    // is the part of the formula ok?
    if (
      this._operations[part] === undefined &&
      isNaN(numPart) === true
    ) {
      throw new Error('wrong char at position ' + index);
    }

    // do we have to set something on the normal stack?
    if (isNaN(numPart) === false) {
      stack.push(numPart);
    } else {
      this._operations[part].apply(this, stack);
      stack = [];
    }
  }, this);

  // return result
  return this.toNumber();
};

rpn.prototype.divide = function() {
  return this._add(Array.prototype.slice.call(arguments), this._divide);
};

rpn.prototype._divide = function(nums) {
  return nums.reduce(function(previous, current) {
    return previous / current;
  });
};

rpn.prototype.minus = function() {
  return this._add(Array.prototype.slice.call(arguments), this._minus);
};

rpn.prototype._minus = function(nums) {
  return nums.reduce(function(previous, current) {
    return previous - current;
  });
};

rpn.prototype.multiply = function() {
  return this._add(Array.prototype.slice.call(arguments), this._multiply);
};

rpn.prototype._multiply = function(nums) {
  return nums.reduce(function(previous, current) {
    return previous * current;
  });
};

rpn.prototype.plus = function() {
  return this._add(Array.prototype.slice.call(arguments), this._plus);
};

rpn.prototype._plus = function(nums) {
  return nums.reduce(function(previous, current) {
    return previous + current;
  });
};


/**
 * resets the complete stack
 *
 * @return {object} only return myself
 */
rpn.prototype.reset = function() {
  this._stack = [];

  return this;
};


/**
 * calculcates the result of the oo-style
 *
 * @return {number} the result
 */
rpn.prototype.toNumber = function() {
  if (this._stack.length > 1) {
    throw new Error('stack has more than one entry');
  }

  return this._stack.pop();
};
