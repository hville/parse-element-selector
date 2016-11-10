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
 * @returns {Object} markup definition
 */
module.exports = function parseSel(sel, def) {
	if (!def) def = {attributes: {}, element:{}} // [, tagName: ''][, xmlns: ''][, prefix: '']
	else {
		if (!def.attributes) def.attributes = {}
		if (!def.element) def.element = {}
	}

	var ctx = {
		c: markers.tag,
		m: 'v',
		v: '',
		f: setTN
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
function setId(res, ctx) {
	res.attributes.id = ctx.v
}
function appendClass(res, ctx) {
	var att = res.attributes
	if (ctx.v) {
		if (att.class) att.class += ' ' + ctx.v
		else att.class = ctx.v
	}
}
function setAttribute(res, ctx) {
	if (ctx.k === 'xmlns') res.element.xmlns = ctx.v
	else res.attributes[ctx.k] = ctx.v || true
}
function setTN(res, ctx) {
	res.element.tagName = ctx.v
}
function checkTagNS(res) {
	var tagName = res.element.tagName,
			tagIndex = tagName.indexOf(':')
	if (tagIndex >= 0) {
		res.element.prefix = tagName.slice(0, tagIndex)
		res.element.tagName = tagName.slice(tagIndex+1)
	}
	return res
}
