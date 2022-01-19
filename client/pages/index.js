import Router from 'next/router'

import Cardreview from '../components/cards/Cardreview'
import Accessbutton from '../components/buttons/Accessbutton'
import { cardStd } from '../services/renderCards'
import renderBanner from '../services/renderBanner'
import CpnIndexHeader from '../components/cpnpages/cpnindexheader' 

import { useAppContext } from '../hooks/app-wrapper';

const MainPage = ({ pics }) => {
	
	const { show } = useAppContext()

	const goToStyle = value => {
		Router.push(`/style/${value}`)
	}
	
	const goToReviews = () => {
		Router.push(`/reviews`)
	}


	const reviewsList = () => {
		if(pics.reviews.length > 0){		
			return pics.reviews.map(review => {
				return (
					<div key={review._id}>
						<Cardreview
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
			return <Accessbutton clicked={() => goToReviews()}>See All Reviews</Accessbutton>
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
			<div className="navbar">
				<h1>Navbar ........</h1>
			</div>
			<div className="index__content">
				{carsList}
				<h1>Reviews ....</h1>
				{reviewsList()}
				{renderAccessToAllReviews()}
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

