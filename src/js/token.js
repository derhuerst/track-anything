'use strict'

$('#token').addEventListener('submit', function (e) {
	e.preventDefault()
	const data = new URLSearchParams()
	data.append('email', $('#token-email').value)
	request('/tokens', {
		  method: 'POST'
		, body:   data
	})
})
