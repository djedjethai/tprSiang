const mock = require('mock-fs');
const { saveToken, encrypt, verify } = require('../token')

const { readFile } = require('fs').promises

it('makes sure the token is saved', async() => {
	const token = 'theIsTheToken'
	mock({
		'/opt/app/tmp/token.txt': ''
	});

	const hash = await encrypt(token)
	await saveToken(hash)
	const hashFromFile = await readFile('/opt/app/tmp/token.txt', 'utf8')
	const isVerify = await verify(token, hashFromFile)

	mock.restore();	
	expect(isVerify).toBe(true)	
})

