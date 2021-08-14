import Router from 'next/router'
import renderBanner from '../../services/renderBanner'
import translator from '../../services/translator'

import Cardstd from '../../components/cardStd/Cardstd' 

const TypePage = ({ pics, type }) => {
	console.log('picsmain from type: ', pics)

	const goToCar = value => {
		console.log(value)
		// here we push for single car details
		Router.push(`/car/${value}`)
	}


	const carsList = pics.carsData.map(car => {
		return(
			<Cardstd
				refKey={car._id}
				pic={car.pic}
				serie={car.serie}
				price={car.price}
				style={car.style}
				engine={car.engine}
				clicked={() => goToCar(car._id)}
			/>
		)
	})

	return (
		<div>
			{renderBanner(pics.mainPics)}
			<h1>the typepage: {translator(type)}</h1> 
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
