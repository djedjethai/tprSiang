import { renderButtonContacts } from '../../services/renderCards'
import CardReview from '../../components/cards/cardReview'
import renderBanner from '../../services/renderBanner'
import Title from '../../components/ui/title' 



const ReviewsPage = ({ pics }) => {
	
	const reviewsList = pics.reviews.map(review => {
		return(
			<div key={review._id}>
				<CardReview
					key={review._id}
					reviewDetails={review}
				/>
			</div>
		)
	})


	return (
		<div>
			{renderBanner(pics.mainPics)}
			<Title 
				classname="title"
				title="All reviews"
			/>
			<div className="reviews">
				<div className="reviews__btnIndex">
					{renderButtonContacts("btn-thai-text", "ติดต่อ")}
				</div>
				<div className="reviews__listIndex">
					{reviewsList}
				</div>
			</div>
		</div>
	)
}

ReviewsPage.getInitialProps = async (context, client) => {

	// const { data } = await axios.get(`http://localhost:5000/type/${typeId}`)
	// console.log("the client: ", client)
	const { data } = await client.get(`/reviewsClient`)

	return { pics: data }
}

export default ReviewsPage



