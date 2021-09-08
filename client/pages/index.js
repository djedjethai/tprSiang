import Router from 'next/router'

import Cardstd from '../components/cardStd/Cardstd'
import Cardreview from '../components/cardReviews/Cardreview'
import Accessbutton from '../components/buttons/Accessbutton'
import renderBanner from '../services/renderBanner'

const MainPage = ({ pics }) => {
	
	// const goToStyle = value => {
	// 	Router.push(`/style/${value}`)
	// }

	// const carsList = pics.carsData.map(car => {
	// 	return(
	// 		<Cardstd
	// 			key={car._id}
	// 			carDetails={car} 
	// 			clicked={() => goToStyle(car.style)
	// 		/>
	// 	)
	// })

	const goToStyle = value => {
		Router.push(`/style/${value}`)
	}
	
	const goToReviews = () => {
		// console.log('go to reviews page coool')
		Router.push(`/reviews`)
	}


	const reviewsList = pics.reviews.map(review => {
		return(
			<Cardreview
				key={review._id}
				reviewDetails={review}
			/>
		)
	})

	const carsList = pics.carsData.map(car => {
		return(
			<Cardstd
				key={car._id}
				carDetails={car} 
				clicked={() => goToStyle(`${car.style}=${car._id}`)}
			/>
		)
	})
		
	return (
		<div>
			{renderBanner(pics.mainPics)}
			<h1>Index !!!!, main page</h1>
			{carsList}
			<h1>Reviews ....</h1>
			{reviewsList}
			<p></p>
			<Accessbutton clicked={() => goToReviews()}>See All Reviews</Accessbutton>
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



// const NewRenderBanner = renderBanner(pics)

	// const NewRenderBanner = () => {
	// 	const lgt = pics.mainPics.length
	// 	console.log('titititit: ', pics.mainPics.length)
	// 	if(pics.mainPics.length > 0) {
	// 		return (
	// 			<div>
	// 			<img src={pics.mainPics[count].pic} style={{width:300}} />
	// 			</div>
	// 		)
	// 		
	// 	} else {
	// 		return <p>Banner under building</p>
	// 	}
	// }

