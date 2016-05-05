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
const request = (url, opt) => fetch(url, opt || {})
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



$('#read').addEventListener('submit', function (e) {
	e.preventDefault()
	const id = $('#read-id').value
	request(base + '/trackers/' + id).then((body) =>
		$('#read-data').innerHTML = body.values)
})

$('#token').addEventListener('submit', function (e) {
	e.preventDefault()
	const data = new URLSearchParams()
	data.append('email', $('#token-email').value)
	request(base + '/tokens', {
		  method: 'post'
		, body:   data
	})
})

$('#new').addEventListener('submit', function (e) {
	e.preventDefault()
	const data = new URLSearchParams()
	data.append('id',    $('#new-id').value)
	data.append('token', $('#new-token').value)
	request(base + '/trackers', {
		  method: 'post'
		, body:   data
	})
	.then((body) => $('#new-data').innerHTML = body.key)
})