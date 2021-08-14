import Cardstd from '../../components/cardStd/Cardstd'

const CarPage = ({ pics }) => {

	const goToCar = (value) => {}

	const carsList = pics.carsData.map(car => {
		return(
			<Cardstd
				refKey={car._id}
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
			<h1>the car page</h1> 
			{carsList}
		</div>
	)

}

CarPage.getInitialProps = async (context, client) => {
	const { carId } =  context.query

	const { data } = await client.get(`/car/${carId}`)

	return { pics: data }
}

export default CarPage


