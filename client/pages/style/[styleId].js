import Router from 'next/router'

import Cardstd from '../../components/cardStd/Cardstd'

const StylePage = ({ pics, style }) => {
	
	const goToCar = value => {
		console.log(value)
		Router.push(`/car/${value}`)
	}

	const carsList = pics.carsData.map(car => {
		return(
			<Cardstd
				key={car._id}
				carDetails={car}
				clicked={() => goToCar(car._id)}
			/>
		)
	})
	
	return (
		<div>
			<h1>the style page: {style}</h1> 
			{carsList}
		</div>
	)
}

StylePage.getInitialProps = async (context, client) => {
	const { styleId } =  context.query
	const arrStyleId = styleId.split('=')

	const { data } = await client.get(`/style/${arrStyleId[0]}?styleid=${arrStyleId[1]}`)

	console.log('the datas: ', data)

	return { pics: data, style: arrStyleId[0] }
}

export default StylePage


