# rpn.js
simple reverse polish notation lib.

## usage
let's see some examples:

```
var rpn = new (require('./app.js'))();
```

```
// all of them has 11 as a result
var foo = 1 + 4 + 2 * 3 // normal notation
var foo = rpn.multiply(2, 3).plus(1, 4).plus().toNumber(); // rpn object-oriented
var foo = rpn.calc('2 3 * 1 4 + +'); // rpn formula
```

```
// all of them has 21 as result
var foo = (1 + 2) * (3 + 4); // normal notation
var foo = rpn.plus(1, 2).plus(3, 4).multiply().toNumber(); // rpn object-oriented
var foo = rpn.calc('1 2 + 3 4 + *'); // rpn formula
```

If you use the object-oriented calculation style, you have manually call `.toNumber()` to get the result. With the `calc`-function (formula-style) you will get the result directly.

## reset
to empty the stack just call `rpn.reset()` to do so. `.toNumber()` and `.calc()` will automatically reset the stack.

## operations
- plus (+)
- minus (-)
- multiply (*)
- divide (/)

## license
(The MIT License)

Copyright (c) 2009-2013 André Kussmann <zoddy@zoddy.de>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.