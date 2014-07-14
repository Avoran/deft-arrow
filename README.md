# Deft-Arrow

Deft-Arrow is a small [angular](http://angularjs.org) module that allows you to simply add an arrow(triangle) in your DOM wherever you want.

## Installing Deft-Arrow

- Clone the repo: `git clone https://github.com/deft/deft-angular-arrow.git`
```
<script src="/path/to/your/scripts/here/arrow.js"></script>
```

- Install with Bower: `bower install deft-angular-arrow`
```
<script src="/bower_components/deft-angular-arrow/arrow.js"></script>
```


## Using Deft-Arrow

- Add a dependency to `deft.arrow` in your app module, eg: `angular.module('myModule', ['deft.arrow'])`
- Add the arrow to a DOM element like:
```
<div>
	some pretty text here
	<arrow position="'right'" width="45" height="15"></arrow>
</div>
```
