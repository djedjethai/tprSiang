import axios from 'axios'

const TypePage = ({ data }) => {
	return <h1>the typepage { data }</h1> 
}

TypePage.getInitialProps = async () => {
	// const response = await axios.get("http://api:5000/main")
	// const response = await axios.get("http://api:5000/type/moncul")
	const response = await axios.get("http://api:5000/type/รุนรถ")
	// const response = await axios.get("http://api:5000/type/รถยนฅ์เพื่อการพาณิซย์")
console.log(response)
	// const str = { data: response.data }
	const str = { data: "putain de merde" }
	return str
}

export default TypePage



















// export default() => {
// 	return <h1> type page !!!</h1>
// }
