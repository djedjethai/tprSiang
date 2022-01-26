import Router from 'next/router'
import renderBanner from '../../services/renderBanner'
import { cardStd } from '../../services/renderCards'
import translator from '../../services/translator'

import Navbar from '../../components/navigation/navbar' 
//import GoToContact from '../../components/cards/cardGlobal/goToContact'

const TypePage = ({ pics, type }) => {
	console.log('picsmain from type: ', pics)

	const goToCar = value => {
		console.log(value)
		// here we push for single car details
		Router.push(`/car/${value}`)
	}

	const carsList = pics.carsData.map(car => {
		return cardStd(
				car,
				() => goToCar(`${car._id}=${car.style}`),
				car._id
		)
	})

	
	return (
		<div>
			{renderBanner(pics.mainPics)}
			<Navbar />
			<h2>the typepage: {translator(type)}</h2> 
			<div className="cardStd">
				{carsList}
			</div>
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
