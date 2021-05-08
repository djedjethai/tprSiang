import axios from 'axios'

//const MainPage = ({data}) => {

const MainPage = async() => {
 	const response = await axios.get("http://localhost:4000/main")
	return <h1>index !!!! {response.data}</h1>
}

// MainPage.getInitialProps = async () => {
// 	const response = await axios.get("http://localhost:4000/main")
// 
// 	// need to create an arr to then destruct
// 	// otherwise the datas get parsed
// 	const str = { data: response.data } 
// 	return str
// }

export default MainPage

