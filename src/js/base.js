'use strict'

const $ = (selector) => document.body.querySelector(selector)

const notify = (type, msg) => {
	const e = document.createElement('p')
	e.setAttribute('class', 'notification ' + type)
	e.innerHTML = msg
	document.body.insertBefore(e, document.body.firstChild)
	setTimeout(() => document.body.removeChild(e), 5000)
}

const base = 'http://localhost:8002'
const request = (endpoint, opt) => fetch(base + endpoint, opt || {})
	.catch((err) => {notify('error', err.message);throw err})
	.then((res) => res.json())
	.catch((err) => {notify('error', err.message);throw err})
	.then((body) => {
		if (body.status === 'ok') {
			notify('success', body.msg)
			return body
		} else {
			notify('error', body.msg)
			throw new Error(body.msg)
		}
	})
