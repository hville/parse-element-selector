/*
	special characters with associated actions:
	m:mode to edit k OR v
	k:key, v:value, f:onDoneFunction
	x:specialCharacters
	c:action set
*/
var markers = {
	tag: {
		'#': {m: 'v', f: setId, x: 'tag'},
		'.': {m: 'v', f: appendClass, x: 'tag'},
		'[': {m: 'k', k: '', f: setAttribute, x: 'key'},
	},
	key: {
		'=': {m: 'v', x: 'val'},
		']': {x: 'tag'}
	},
	val: {
		'"': {},
		']': {x: 'tag'}
	}
}
/**
 * parse Element Selector string and return a markup definition
 * @param {string} sel - W3 selector string
 * @param {Object} [def] - predefined options
 * @returns {Object} markup definition: {tag, xmlns, prefix, attributes}
 */
module.exports = function parseSel(sel) {
	var def = {}

	//initial control context to be changed on special chars
	var ctx = {
		c: markers.tag,
		m: 'v',
		v: '',
		f: setTag
	}
	for (var i=0; i<sel.length; ++i) {
		var act = ctx.c[sel[i]]
		if (act) {
			if(act.f) { // callback and reset
				ctx.f(def, ctx)
				ctx.k = act.k
				ctx.f = act.f
				ctx.v = ''
			}
			if (act.m) ctx.m = act.m
			if (act.x) ctx.c = markers[act.x]
		}
		else ctx[ctx.m] += sel[i]
	}
	ctx.f(def, ctx)
	return checkTagNS(def)
}
// call back editing function
function setId(res, ctx) {
	if (!res.attributes) res.attributes = {}
	res.attributes.id = ctx.v
}
function appendClass(res, ctx) {
	if (!res.attributes) res.attributes = {}
	var att = res.attributes
	if (ctx.v) {
		if (att.class) att.class += ' ' + ctx.v
		else att.class = ctx.v
	}
}
function setAttribute(res, ctx) {
	if (ctx.k === 'xmlns') res.xmlns = ctx.v
	else {
		if (!res.attributes) res.attributes = {}
		res.attributes[ctx.k] = ctx.v || true
	}
}
function setTag(res, ctx) {
	res.tag = ctx.v
}
// final prefix chack
function checkTagNS(res) {
	var tag = res.tag,
			idx = tag.indexOf(':')
	if (idx >= 0) {
		res.prefix = tag.slice(0, idx)
		res.tag = tag.slice(idx+1)
	}
	return res
}
