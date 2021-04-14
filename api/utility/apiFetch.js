module.exports = (
	urlPostToSaveDatas,
	urlRedirect,
	dataDb
) => {
	fetch('http://localhost:3050/admin/upload', {
					method: 'POST',
					mode: 'no-cors',
					body: JSON.stringify(data),
					headers: {
				'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
					// 'Content-Type': 'application/json'
					}
				})
				.then(d => {				
// in order to access the data from a ReadableStream you need to call one of the conversion
					return d.json()
				})
				.then(d => {
					key = d.key
					fetch(d.url, {
						method: 'PUT',
						body: event.target[0].files[0],
						headers: {
						'Content-Type': "image/jpeg"
						}	
					})	
				})
				.then(d => {
					// picture url will be 
				const picUrl = `https://node-advance-course.s3-ap-southeast-1.amazonaws.com/${key}`
				console.log('after target s3: ', picUrl)
				
				// dataForDb should be pass as arg, and here we add the picUrl
				const dataForDb = {
					...dataDb,
					picUrl
				}
					
				return fetch(`http://${urlPostToSaveDatas}`, {
					method: 'POST',
					mode: 'no-cors',
					body: JSON.stringify(dataForDb),
					headers: {
				'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
					// 'Content-Type': 'application/json'
					}

				})
				})
				.then(d => {
					if (d) {
		window.location.replace(`http://${urlRedirect}`)
					}	
				})
				.catch(e => console.log(e))

}


