import Router from 'next/router'
import renderBanner from '../../services/renderBanner'
import translator from '../../services/translator'

import Cardstd from '../../components/cards/Cardstd' 
import Gotocontact from '../../components/cards/cardGlobal/Gotocontact'

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
				<Cardstd
					key={car._id}
					carDetails={car}
					clicked={() => goToCar(`${car._id}=${car.style}`)}
				/>
				<Gotocontact />
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
