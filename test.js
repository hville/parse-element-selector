var ct = require('cotest'),
		sel = require('./index')

ct('single tag', function(){
	ct('{==}', sel('div'), {tag: 'div'})
	ct('{==}', sel(''), {})
})
ct('mixed classes and id', function(){
	ct('{==}', sel('.c1#i1.c2'), {attributes: {id: 'i1', class: 'c1 c2'}})
	ct('{==}', sel('div#i1.c1.c2'), {tag: 'div', attributes: {id: 'i1', class: 'c1 c2'}})
	ct('{==}', sel('div.c1.c2#i1'), {tag: 'div', attributes: {id: 'i1', class: 'c1 c2'}})
	ct('{==}', sel('..##..##'), {})
})
ct('svg attributes', function(){
	ct('{==}', sel('[viewBox="0 0 32 32"]'), {attributes: {viewBox: '0 0 32 32'}})
	ct('{==}', sel('div#i1.c1.c2'), {tag: 'div', attributes: {id: 'i1', class: 'c1 c2'}})
	ct('{==}', sel('div.c1.c2#i1'), {tag: 'div', attributes: {id: 'i1', class: 'c1 c2'}})
	ct('{==}', sel('..##..##'), {})
})
ct('mixed classes and id as attributes', function(){
	ct('{==}', sel('.c1#i1.c2[id=i2][class=c3]'), {attributes: {id: 'i2', class: 'c3'}})
	ct('{==}', sel('.c1#i1.c2[id="i2"][class="c3"]'), {attributes: {id: 'i2', class: 'c3'}})
	ct('{==}', sel('div#i1[class=c3].c1.c2'), {tag: 'div', attributes: {id: 'i1', class: 'c3 c1 c2'}})
	ct('{==}', sel('div#i1[class="c3"].c1.c2'), {tag: 'div', attributes: {id: 'i1', class: 'c3 c1 c2'}})
})
ct('tag namespace prefix', function(){
	ct('{==}', sel('svg:circle'), {prefix: 'svg', tag: 'circle'})
})
ct('markers in attribute values', function() {
	ct('{==}', sel('[a=b.c]').attributes.a, 'b.c')
	ct('{==}', sel('[a:b=c]').attributes['a:b'], 'c')
	ct('{==}', sel('[a:b=c.d]').attributes['a:b'], 'c.d')
	ct('{==}', sel('svg[style="display: none;"]').attributes.style, 'display: none;')
})
