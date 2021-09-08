import Router from 'next/router'

import Cardcardetails from '../../components/cardCarDetails/Cardcardetails'
import Cardpicdetails from '../../components/cardCarDetails/Cardpicdetails.js'
import Contactbutton from '../../components/buttons/Contactbutton'

const CarPage = ({ pics }) => {

	const goToContact = () => {
		Router.push('/contact')
	}

	const displayPicsStyle = pics.picsStyle.map(picture => {
		return(
			<Cardpicdetails
				key={picture._id}
				pict={picture.pic[0]}
			/>
		)
	})


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
			<h1>car pics style</h1>
			<Contactbutton clicked={() => goToContact()}>ติดต่อ</Contactbutton>
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


