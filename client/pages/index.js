import Router from 'next/router'

import CardReview from '../components/cards/cardReview'
import { cardStd, renderButtonReviews } from '../services/renderCards'
import renderBanner from '../services/renderBanner'
import CpnIndexHeader from '../components/cpnpages/cpnIndexHeader' 
import Title from '../components/ui/title' 

import { useAppContext } from '../hooks/app-wrapper';



const MainPage = ({ pics }) => {
	
	const { show } = useAppContext()

	const goToStyle = value => {
		Router.push(`/style/${value}`)
	}
	
	const reviewsList = () => {
		if(pics.reviews.length > 0){		
			return pics.reviews.map(review => {
				return (
					<div key={review._id}>
						<CardReview
							key={review._id}
							reviewDetails={review}
						/>
						<p></p>
					</div>
				)
			})
		} else {
			return (
				<div>
					<p>No Available review</p>
				</div>
			)
		}
	}

	const renderAccessToAllReviews = () => {
		
		if(pics.reviews.length > 0){		
			return renderButtonReviews("btn", "See All Reviews")
		} else {
			return ""
		}
	}

	const carsList = pics.carsData.map(car => {
		return cardStd(
				car, 
				() => goToStyle(`${car.style}=${car._id}`),
				car._id
			)
	})

			
	return (
		<div className="index">
			<div className="index__header">
				<div className="index__header--banner">
					{renderBanner(pics.mainPics)}
				</div>
				<CpnIndexHeader />
			</div>
			<div className="index__content">
				<Title 
					classname="title-alone"
					classtitle="heading-primary"
					title="Best Selling"
				/>
				<div className="cardStd">
					{carsList}
				</div>
				<Title 
					classname="title"
					classtitle="heading-primary"
					title="Reviews"
				/>
				<div className="reviews">
					<div className="reviews__listIndex">
						{reviewsList()}
					</div>
					<div className="reviews__btnIndex">
						{renderAccessToAllReviews()}
					</div>
				</div>
			</div>
		</div>
	)
}

 MainPage.getInitialProps = async (context, client) => {
 	// domain "apiclient:4000" as apiclient and nextjs are in a bridge network
	// localhost from a container belong to the container, can t be use between container
 	
	// const { data } = await axios.get("http://api:5000/main")
	const { data } = await client.get('/main')

	// need to create an arr to then destruct
 	// otherwise the datas get parsed
 	return { pics: data }
 }

export default MainPage

