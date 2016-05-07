'use strict'

const path = require('path')
const h    = require('pithy')



const styles = (page) => Array.isArray(page.css)
	? page.css.map((s) => h.link({
		  rel: 'stylesheet'
		, type: 'text/css'
		, href: s
	})) : []

const scripts = (page) => Array.isArray(page.js)
	? page.js.map((s) => h.script({
		  type: 'application/javascript'
		, href: s
	})) : []



const head = (site, page) => h.head(null, [
	  h.meta({charset: 'utf-8'})
	, h.title(null, site.title)
	, h.meta({name: 'author', content: site.author})
	, h.meta({name: 'description', content: site.description})
].concat(styles(page)))

const render = (site, page, content) => '<!DOCTYPE html>' + h.html(null, [
	  head(site, page)
	, h.body(null, [
		new h.SafeString(content)
	].concat(scripts(page)))
])



module.exports = render
