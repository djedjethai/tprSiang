import Cardcardetails from '../../components/cardCarDetails/Cardcardetails'

const CarPage = ({ pics }) => {

	const goToCar = (value) => {}

	const carDetails = pics.carsData.map(car => {
		return(
			<Cardcardetails
				key={car._id}
				carDts={car}
			/>
		)
	})

	return (
		<div>
			<h1>the car page</h1> 
			{carDetails}
		</div>
	)

}

CarPage.getInitialProps = async (context, client) => {
	const { carId } =  context.query

	const { data } = await client.get(`/car/${carId}`)

	return { pics: data }
}

export default CarPage


