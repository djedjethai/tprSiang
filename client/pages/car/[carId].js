import Router from 'next/router'

import CardCarDetails from '../../components/cards/cardCarDetails'
import CardPicDetails from '../../components/cards/cardPicDetails.js'
import ContactButton from '../../components/buttons/contactButton'

const CarPage = ({ pics }) => {

	const goToContact = () => {
		Router.push('/contact')
	}

	const displayPicsStyle = pics.picsStyle.map(picture => {
		return(
			<div key={picture._id}>
				<CardPicDetails
					key={picture._id}
					pict={picture.pic[0]}
				/>
			</div>
		)
	})


	const carDetails = pics.carsData.map(car => {
		return(
			<div key={car._id}>
				<CardCarDetails
					key={car._id}
					carDts={car}
				/>
			</div>
		)
	})

	return (
		<div>
			<h1>the car page</h1> 
			{carDetails}
			<h1>car pics style</h1>
			<ContactButton clicked={() => goToContact()}>ติดต่อ</ContactButton>
			<p></p>
			{displayPicsStyle}
		</div>
	)
}

CarPage.getInitialProps = async (context, client) => {
	const { carId } =  context.query
	const arrStyleId = carId.split('=')

	const { data } = await client.get(`/car/${arrStyleId[0]}?style=${arrStyleId[1]}`)

	return { pics: data }
}

export default CarPage


