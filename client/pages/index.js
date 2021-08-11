import Router from 'next/router'

import Cardstd from '../components/cardStd/Cardstd'
import renderBanner from '../services/renderBanner'

const MainPage = ({ pics }) => {
	
	const goToStyle = value => {
		console.log(value)
		Router.push(`/style/${value}`)
	}

	const carsList = pics.cars.map(car => {
		return(
			<Cardstd 
				key={car._id}
				pic={car.pic}
				serie={car.serie}
				price={car.price}
				style={car.style}
				engine={car.engine}
				clicked={() => goToStyle(car.style)}	
			/>

			// <div key={car._id}>
			// 	<img src={car.pic} style={{width:150}} /><br />
			// 	{car.serie}<br />
			// 	{car.price}<br />
			// 	{car.style}<br />
			// 	<hr />
			// </div>
		)
	})

	return (
		<div>
			{renderBanner(pics)}
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



// const NewRenderBanner = renderBanner(pics)

	// const NewRenderBanner = () => {
	// 	const lgt = pics.mainPics.length
	// 	console.log('titititit: ', pics.mainPics.length)
	// 	if(pics.mainPics.length > 0) {
	// 		return (
	// 			<div>
	// 			<img src={pics.mainPics[count].pic} style={{width:300}} />
	// 			</div>
	// 		)
	// 		
	// 	} else {
	// 		return <p>Banner under building</p>
	// 	}
	// }

