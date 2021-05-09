import axios from 'axios'

const MainPage = ({ data }) => {
	return <h1>index !!!! { data }</h1>
}

 MainPage.getInitialProps = async () => {
 	// domain "apiclient:4000" as apiclient and nextjs are in a bridge network
	// localhost from a container belong to the container, can t be use between container
 	const response = await axios.get("http://apiclient:4000/main")
 
 	// need to create an arr to then destruct
 	// otherwise the datas get parsed
 	const str = { data: response.data } 
 	return str
 }

export default MainPage

