import Router from 'next/router'
import renderBanner from '../../services/renderBanner'
import translator from '../../services/translator'

import CardStd from '../../components/cards/cardStd' 
import GoToContact from '../../components/cards/cardGlobal/goToContact'

const TypePage = ({ pics, type }) => {
	console.log('picsmain from type: ', pics)

	const goToCar = value => {
		console.log(value)
		// here we push for single car details
		Router.push(`/car/${value}`)
	}

	const carsList = pics.carsData.map(car => {
		return(
			<div>
				<CardStd
					key={car._id}
					carDetails={car}
					clicked={() => goToCar(`${car._id}=${car.style}`)}
				/>
				<GoToContact />
			</div>
		)
	})

	return (
		<div>
			{renderBanner(pics.mainPics)}
			<div className="navbar">
				<h1>Navbar ........</h1>
			</div>
			<h2>the typepage: {translator(type)}</h2> 
			{carsList}
		</div>
	)
}

TypePage.getInitialProps = async (context, client) => {
	// data received from link
	const { typeId } = context.query

	// const { data } = await axios.get(`http://localhost:5000/type/${typeId}`)
	const { data } = await client.get(`/type/${typeId}`)
	
	return { pics: data, type: typeId}
}

export default TypePage



















// export default() => {
// 	return <h1> type page !!!</h1>
// }
