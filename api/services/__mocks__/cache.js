const fromRedis = {
	// fromRedis: jest.fn().mockResolvedValue({})
	fromRedis: jest.fn(() => Promise.resolve({}))
}

const cacheEnum = () => {}
const setDataInRedis = () => {}

module.exports = {fromRedis, cacheEnum, setDataInRedis}


