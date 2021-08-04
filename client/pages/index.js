import { useEffect, useState } from 'react'

const MainPage = ({ pics }) => {
	const [count, setCount] = useState(0)

	console.log("c de la bombe bb: ", pics)
	
	
	let ref = 0

	useEffect(() => {
		const lgt = pics.mainPics.length
		
		const runCount = () => {
			if(lgt === 0) setCount(0)

			if(ref < lgt - 1) {
				ref++
				setCount(ref)
			}
			else {
				ref = 0
				setCount(ref)
			}
		}

		const inter = setInterval(runCount, 2000)


		return () => {
			clearInterval(inter)
		}
	},[])


	const carsList = pics.cars.map(car => {
		return(
			<div key={car._id}>
				<img src={car.pic} style={{width:150}} /><br />
				{car.serie}<br />
				{car.price}<br />
				{car.style}<br />
				<hr />
			</div>
		)
	})

	return (
		<div>
			{count}
			<div>
				<img src={pics.mainPics[count].pic} style={{width:300}} />
			</div>
			<h1>index !!!!, main page</h1>
			{carsList}
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

