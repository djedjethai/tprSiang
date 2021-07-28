import axios from 'axios'

const StylePage = ({ picsmain, data }) => {
	console.log('picsmain from stylepage: ', picsmain)
	return <h1>the stylepage { data }</h1> 
}

StylePage.getInitialProps = async () => {

	// data received from link
	// here we simulate
	const data = 'Single'

	const response = await axios.get(`http://api:5000/style/${data}`)
	console.log('the resp in style client: ', response.data)
	
	const str = { data: "page style" }
	return str
}

export default StylePage


