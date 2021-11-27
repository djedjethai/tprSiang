import Router from 'next/router'

import Headerstyle from '../../components/cards/Headerstyle'
import Cardstd from '../../components/cards/Cardstd'
import Gotocontact from '../../components/cards/cardGlobal/Gotocontact'

const StylePage = ({ pics, style }) => {
	
	const goToCar = value => {
		Router.push(`/car/${value}`)
	}

	const showSelectedCar = () => {
		if(pics.selected.length > 0){
			return (
				<Headerstyle 
					carDetails={pics.selected[0]}
					clicked={() => goToCar(`${pics.selected[0]._id}=${pics.selected[0].style}`)}
				/>

			)
		} else {
			return null
		}
	}

	
	const carsList = pics.list.map((car, index) => {
			return (
				<div key={car._id}>
					<Cardstd
						key={car._id}
						carDetails={car}
						clicked={() => goToCar(`${car._id}=${car.style}`)}
					/>
					<Gotocontact />
				</div>
			)
	})	
		
	return (
		<div>
			{showSelectedCar()}
			<h1>the style page: {style}</h1> 
			{carsList}
		</div>
	)
}

function selector(datas, id) {
	let selected = []
	let list = []
	for(const dt of datas){
		if(dt._id === id) selected.push(dt)
		else list.push(dt) 
	}

	return {selected, list}
}

StylePage.getInitialProps = async (context, client) => {
	const { styleId } =  context.query
	const arrStyleId = styleId.split('=')

	const { data } = await client.get(`/style/${arrStyleId[0]}`)

	const toShow = selector(data.carsData, arrStyleId[1])

	return { pics: toShow, style: arrStyleId[0]}
}

export default StylePage


