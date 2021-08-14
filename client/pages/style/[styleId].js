import Router from 'next/router'

import Cardstd from '../../components/cardStd/Cardstd'
import renderBanner from '../../services/renderBanner'

const StylePage = ({ pics, style }) => {
	
	const goToCar = value => {
		console.log(value)
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
			<h1>the style page: {style}</h1> 
			{carsList}
		</div>
	)

	console.log('picsmain from stylepage: ', picsmain)
	return <h1>the stylepage { data }</h1> 
}

StylePage.getInitialProps = async (context, client) => {
	const { styleId } =  context.query

	const { data } = await client.get(`/style/${styleId}`)
	
	return { pics: data, style: styleId }
}

export default StylePage


