import renderBanner from '../../services/renderBanner'
import translator from '../../services/translator'

const TypePage = ({ pics, type }) => {
	console.log('picsmain from type: ', pics)

	const carsList = pics.picsType.map(car => {
		return(
			<div key={car._id}>
				<img src={car.pic} style={{width:150}} /><br />
				{car.serie}<br/>
				{car.price}<br/>
				{car.style}<br/>
				{car.engine}<br/>
			</div>
		)
	})

	return (
		<div>
			{renderBanner(pics)}
			<h1>the typepage: {translator(type)}</h1> 
			{carsList}
		</div>
	)
}

TypePage.getInitialProps = async (context, client) => {
	// data received from link
	const { typeId } = context.query

	// const { data } = await axios.get(`http://localhost:5000/type/${typeId}`)
	const { data } = await client.get(`/type/${typeId}`)
	
	return { pics: data, type: typeId}
}

export default TypePage



















// export default() => {
// 	return <h1> type page !!!</h1>
// }
