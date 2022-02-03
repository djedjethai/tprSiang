import Router from 'next/router'

import AccessButton from '../../components/buttons/accessButton'
import CardReview from '../../components/cards/cardReview'
import renderBanner from '../../services/renderBanner'
// import translator from '../../services/translator'
import Navbar from '../../components/navigation/navbar' 


const ReviewsPage = ({ pics }) => {
	console.log('picsmain from type: ', pics)

	const goToContact = () => {
		Router.push(`/contact`)
	}

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
			<Navbar />
			<AccessButton 
				classname="btn-thai"
				clicked={() => goToContact()}
			>
				ติดต่อ
			</AccessButton>
			<h1>the reviews page</h1> 
			{reviewsList}
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



