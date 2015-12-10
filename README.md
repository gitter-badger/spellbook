# SpellBook
Library for extend the javascript habilities.

## Import module:
```javascript
var sb = require("spellbook");
```

## CLASS EXTENSION:

Array.remove(obj);

```javascript
var list = ['a', 'b', 'c'];
list.remove('b');
```
-> ['a', 'c']

```javascript
var date = new Date();
var list = ['a', 'b', 1, '2', date];
list.remove(['b', 1, date]);
```
-> ['a', '2']


Array.clear();
```javascript
var list = ['a', 'b', 'c'];
list.clear();
```
-> []

## TOOLS:

Range:
```javascript
sb.range(0,10);
```
-> [0,1,2,3,4,5,6,7,8,9,10]
```javascript
sb.range(-100,100,20);
```
-> [-100,-80,-60,-40,-20,0,20,40,60,80,100]
```javascript
sb.range('A','F');
```
-> ['A','B','C','D','E','F')
```javascript
sb.range('m','r');
```
-> ['m','n','o','p','q','r']

Clone Object in javascript ES5 width ES6 style:
```javascript
var NewObject = sb.assing(Object);
var NewObject = sb.clone(Object);
```
Remove object from Array:
```
sb.remove(object1, object2);
```

Clear all values from Array:
```
sb.clear(array);
```

Class check:
```javascript
sb.isFunction(obj);
sb.isArray(obj);
sb.isObject(obj);
sb.isNumber(obj);
sb.isString(obj);
sb.isBoolean(obj);
```
