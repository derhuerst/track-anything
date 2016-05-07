'use strict'

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
