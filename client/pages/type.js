import axios from 'axios'
import translator from '../services/translator'

const TypePage = ({ picsmain, data }) => {
	console.log('picsmain from type: ', picsmain)
	return <h1>the typepage { data }</h1> 
}

TypePage.getInitialProps = async () => {

	// data received from link
	// here we simulate
	const data = translator('รถยนฅ์เพื่อการพาณิซย์')

	const response = await axios.get(`http://api:5000/type/${data}`)
	console.log('response type: ', response.data)
	
	const str = { data: "page type" }
	return str
}

export default TypePage



















// export default() => {
// 	return <h1> type page !!!</h1>
// }
