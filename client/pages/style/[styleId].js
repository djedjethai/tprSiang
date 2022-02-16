import Router from 'next/router'

import { cardStd, headerStyle, renderButtonContacts } from '../../services/renderCards'
import Title from '../../components/ui/title' 

const StylePage = ({ pics, style }) => {
	
	const goToCar = value => {
		Router.push(`/car/${value}`)
	}

	const showSelectedCar = () => {
		if(pics.selected.length > 0){
			return headerStyle(
					pics.selected[0],
					() => goToCar(`${pics.selected[0]._id}=${pics.selected[0].style}`)
			)
		} else {
			return null
		}
	}
	
	const carsList = pics.list.map((car, index) => {
			return cardStd(
					car,
					() => goToCar(`${car._id}=${car.style}`),
					car._id
			)
				
	})	
	
	return (
		<div>
			{showSelectedCar()}
			<div className="back__btn">
				<div className="style__btn">	
					{renderButtonContacts("btn", "contact us")}
				</div>
			</div>
			<Title 
				classname="title"
				title={style}
			/>
			<div className="cardStd">
				{carsList}
			</div>
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


