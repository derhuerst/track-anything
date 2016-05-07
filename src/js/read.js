'use strict'

$('#read').addEventListener('submit', function (e) {
	e.preventDefault()
	const id = $('#read-id').value
	request('/trackers/' + id).then((body) =>
		$('#read-data').innerHTML = body.values.join('\n'))
})
