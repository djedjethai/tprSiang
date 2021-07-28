import axios from 'axios'

export default ({ req }) => {
	if(typeof window === 'undefined'){
		return axios.create({
			baseURL:'http://api:5000',
			headers: req.headers
		})
	}
	else {
		return axios.create({
			baseURL:'http://localhost:5000',
			accept:{'Accept':'application/json'}
		})
	}
}
