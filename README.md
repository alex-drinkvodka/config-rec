Config-rec
==========

Simple config solution with no "append-it-to-my-project-somehow" headache.

Installation
============

```
npm install config-rec --save
```

Usage
======================

1) First of all create `config` folder in your project root directory:

```
mkdir config
```

2) Then create 2 ini files:

```
touch config/main.ini
touch config/env.ini
```

3) `Main.ini` file should contain settings that are not env-specific.

4) Other settings put in `env.ini` file and gitignore it.

5) These two files with settings will be merged. Settings in `env.ini` will override settings
put in `main.ini`.

6) Use it:


```
// config/main.ini
foo = bar
common = main
numericParam = 12
```

```
// config/env.ini
foo2 = bar2
common = env
```

```
// your index.js
var config = require('config-rec');
console.log(config.getParam('foo')); // bar
console.log(config.getParam('foo2')); // bar2
console.log(config.getParam('common')); // env
// if you need to "parseInt" your param use getIntParam method
console.log(config.getIntParam('numericParam')); // 12
```
