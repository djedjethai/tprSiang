const MainPage = ({ pics }) => {
	console.log("c de la bombe bb: ", pics)

	const carsList = pics.cars.map(car => {
		return(
			<div key={car._id}>
				<img src={car.pic} style={{width:150}} /><br />
				{car.serie}<br />
				{car.price}<br />
				{car.style}<br />
				<hr />
			</div>
		)
	})

	return (
		<div>
			<h1>index !!!!, main page</h1>
			{carsList}
		</div>
	)
	
}

 MainPage.getInitialProps = async (context, client) => {
 	// domain "apiclient:4000" as apiclient and nextjs are in a bridge network
	// localhost from a container belong to the container, can t be use between container
 	
	// const { data } = await axios.get("http://api:5000/main")
	const { data } = await client.get('/main')

	// need to create an arr to then destruct
 	// otherwise the datas get parsed
 	return { pics: data }
 }

export default MainPage

