[![Build Status](https://travis-ci.org/instavictor/iv-bus.svg?branch=master)](https://travis-ci.org/instavictor/iv-bus) [![Coverage Status](https://coveralls.io/repos/github/instavictor/iv-bus/badge.svg?branch=master)](https://coveralls.io/github/instavictor/iv-bus?branch=master)

# iv-bus

Simple *i*nsta*v*ictor event bus written in ES6.

## Build

Node v6.2.2+  
Npm v3.9.5+

## Commands
```
  [Usage] 
    gulp [task] [FLAGS]

  [Tasks] 
    help : displays this help
    test : runs mocha test suite
    build : runs standard build (dev flag enabled / es6 disabled)
    build:all : builds all variants

  [Flags]
    --es6 disables es5 transpiling
    --env specifies the environment (prod | dev (default) 

  [Example]
    gulp --env=prod --es6
```

## Examples

### Initialize bus

```javascript
var EventBus = require('ivBus');
var myEventBus = new EventBus();  // create a new event bus
```

### Listen to a channel
```javascript

var foo = {
	id: 'myObject'	
};

var callbackFunc = function(data) {
	console.log(data); // do something with this data
};

// Careful: does not check for duplicates
myEventBus.addListener('testChannel', foo, callbackFunc);
```

### Dispatch to a channel
```javascript

var data = {
	text: 'hello!'
};

myEventBus.dispatch('testChannel', data);
```

### Remove a listener from a channel
```javascript
// Removes all foo objects from listening to testChannel
myEventBus.removeListener('testChannel', foo);
```

### Get all listeners for a channel
```javascript
myEventBus.getListeners('testChannel');
```
