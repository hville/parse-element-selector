<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD032 MD036 -->

# parse-element-selector

*parse string w3 element selector used in hyperscript functions*

• [Example](#example) • [Features](#features) • [API](#api) • [License](#license)

## Example

```javascript
var parse = require('parse-element-selector')

var d01 = parse('div.c1#i1[style="color:blue"].c2'), // {tag:'div', attributes:{id:'i1', class:'c1 c2'}}
    d02 = parse('svg:circle'), // {tag:'circle', prefix:'svg'}
    d03 = parse('circle[xmlns=http://www.w3.org/2000/svg]') // {tag:'circle', xmlns: 'http://www.w3.org/2000/svg'}
```

## API

Object returned is always in the form `{tag, xmlns, prefix, attributes}` so that `tag`, `xmlns` and/or `prefix`
can be used for `document.createElement` or `document.createElementNS` before applying the remaining attributes if any.

# License

Released under the [MIT License](http://www.opensource.org/licenses/MIT)
