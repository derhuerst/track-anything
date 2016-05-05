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



$('#read').addEventListener('submit', function (e) {
	e.preventDefault()
	const id = $('#read-id').value
	request('/trackers/' + id).then((body) =>
		$('#read-data').innerHTML = body.values.join('\n'))
})

$('#track').addEventListener('submit', function (e) {
	e.preventDefault()
	const data = new URLSearchParams()
	data.append('key', $('#track-key').value)
	request('/trackers/' + $('#track-id').value, {
		  method: 'PATCH'
		, body:   data
	})
})

$('#token').addEventListener('submit', function (e) {
	e.preventDefault()
	const data = new URLSearchParams()
	data.append('email', $('#token-email').value)
	request('/tokens', {
		  method: 'POST'
		, body:   data
	})
})

$('#new').addEventListener('submit', function (e) {
	e.preventDefault()
	const data = new URLSearchParams()
	data.append('id',    $('#new-id').value)
	data.append('token', $('#new-token').value)
	request('/trackers', {
		  method: 'POST'
		, body:   data
	})
	.then((body) => $('#new-data').innerHTML = body.key)
})
