import Router from 'next/router'

import Headerstyle from '../../components/cards/Headerstyle'
import Cardstd from '../../components/cards/Cardstd'
import Gotocontact from '../../components/cards/cardGlobal/Gotocontact'

const StylePage = ({ pics, style, carid }) => {
	
	const goToCar = value => {
		Router.push(`/car/${value}`)
	}

	// const showSelectedCar = pics.carsData.filter(car => car._id === carid)
	const showSelectedCar = () => {
		if(pics.carsData.length > 0){
			const carDt = pics.carsData.filter(car => car._id === carid)
			return (
				<Headerstyle 
					carDetails={carDt[0]}
					clicked={() => goToCar(`${carDt[0]._id}=${carDt[0].style}`)}
				/>

			)
		} else {
			return null
		}
	}

	const carsList = pics.carsData.reduce((filtered, car) => {
		if(car._id !== carid){
			filtered.push(
				<div>
					<Cardstd
						key={car._id}
						carDetails={car}
						clicked={() => goToCar(`${car._id}=${car.style}`)}
					/>
					<Gotocontact />
				</div>
			)
		}
		return filtered
	}, [])

		
	return (
		<div>
			{showSelectedCar()}
			<h1>the style page: {style}</h1> 
			{carsList}
		</div>
	)
}

StylePage.getInitialProps = async (context, client) => {
	const { styleId } =  context.query
	const arrStyleId = styleId.split('=')

	const { data } = await client.get(`/style/${arrStyleId[0]}`)

	return { pics: data, style: arrStyleId[0], carid: arrStyleId[1] }
}

export default StylePage


