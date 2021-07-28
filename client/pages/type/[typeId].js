const TypePage = ({ pics }) => {
	console.log('picsmain from type: ', pics)
	return <h1>the typepage</h1> 
}

TypePage.getInitialProps = async (context, client) => {
	// data received from link
	const { typeId } = context.query

	// const { data } = await axios.get(`http://localhost:5000/type/${typeId}`)
	const { data } = await client.get(`/type/${typeId}`)
	
	return { pics: data }
}

export default TypePage



















// export default() => {
// 	return <h1> type page !!!</h1>
// }
