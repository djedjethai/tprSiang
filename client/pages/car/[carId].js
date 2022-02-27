import CardCarDetails from '../../components/cards/cardCarDetails'
import Title from '../../components/ui/title' 
import DisplayImage from '../../components/ui/displayImage' 
import { renderButtonContacts } from '../../services/renderCards'

const CarPage = ({ pics }) => {


	const displayPicsStyle = pics.picsStyle.map(picture => {
		return(
			<div key={picture._id}>
				<DisplayImage
					key={picture._id}
					imgsrc={picture.pic[0]}
					imgalt="image style"
					imgsrcClassname="detailImages__img"
					classname="detailImages__block"
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
				classtitle="heading-primary"
				title="Details"
			/>
			<div className="detailImages">
				{displayPicsStyle}
			</div>
			<div className="reviews__btnIndex">
				{renderButtonContacts("btn-thai-text", "ติดต่อ")}
			</div>
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


