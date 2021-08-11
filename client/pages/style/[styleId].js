import Router from 'next/router'

import Cardstd from '../../components/cardStd/Cardstd'
import renderBanner from '../../services/renderBanner'

const StylePage = ({ pics, style }) => {
	
	const goToCar = value => {
		console.log(value)
		// here we push for single car details
		// Router.push(`/style/${value}`)
	}


	const carsList = pics.picsType.map(car => {
		return(
			<Cardstd
				key={car._id}
				pic={car.pic}
				serie={car.serie}
				price={car.price}
				style={car.style}
				engine={car.engine}
				clicked={() => goToCar(car.style)}	
			/>
		
		)
	})

	return (
		<div>
			{renderBanner(pics)}
			<h1>the style page: `${style}`</h1> 
			{carsList}
		</div>
	)

	console.log('picsmain from stylepage: ', picsmain)
	return <h1>the stylepage { data }</h1> 
}

StylePage.getInitialProps = async (context, client) => {
	const { styleId } =  context.query

	const { data } = await client.get(`/style/${styleId}`)
	console.log('the resp in style client: ', data)
	
	return { pics: data, style: styleId }
}

export default StylePage


