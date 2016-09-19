# iv-bus

## Build

Node v6.2.2
Npm v3.9.5

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

### Usage

```javascript

bus = new EventBus();



```