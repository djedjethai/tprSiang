import Router from 'next/router'

import CardCarDetails from '../../components/cards/cardCarDetails'
import CardPicDetails from '../../components/cards/cardPicDetails.js'
import AccessButton from '../../components/buttons/accessButton'
import Title from '../../components/ui/title' 

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
			{carDetails}
			<Title 
				classname="title"
				title="Details"
			/>
			{displayPicsStyle}
			<AccessButton
				classname="btn"
				clicked={() => goToContact()}
			>
				ติดต่อ
			</AccessButton>

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


