import { useAppContext } from '../hooks/app-wrapper';
import Router from 'next/router'

import HeaderStyle from '../components/cards/headerStyle'
import CardStd from '../components/cards/cardStd'
import AccessButton from '../components/buttons/accessButton'

const goToReviews = () => {
		Router.push(`/reviews`)
	}

const goToContacts = () => {
		Router.push(`/contact`)
	}


const cardStd = (carDetailsRef, clickedRef, keyRef ) => {
	const { show } = useAppContext()
	
	const classname = "cardStd__card"

	if(show){
		return (
			<div key={keyRef} className={classname}>
				<CardStd
					key={keyRef}
					carDetails={carDetailsRef}	
				/>

				<AccessButton 
					classname="btn-thai"
				>
					ติดต่อ
				</AccessButton>
			</div>
		)
	} else {
		return (
			<div key={keyRef} className={classname}>
				<CardStd
					key={keyRef}
					carDetails={carDetailsRef}	
					clicked={clickedRef}
				/>
				<AccessButton 
					classname="btn-thai"
					clicked={() => goToContacts()}
				>
					ติดต่อ
				</AccessButton>
			</div>
		)
	}
}


const headerStyle = (carDetailsRef, clickedRef) => {
		
	const { show } = useAppContext()

	if(show){
		return (
			<HeaderStyle
				carDetails={carDetailsRef}	
			/>
		)
	} else {
		return (
			<HeaderStyle
				carDetails={carDetailsRef}	
				clicked={clickedRef}
			/>
		)
	}
}

const renderButtonContacts = (classname, text) => {
		
	const { show } = useAppContext()

	if(show){
		return (
			<AccessButton 
				classname={classname}
			>
				{text}
			</AccessButton>
		)
	} else {
		return (
			<AccessButton 
				classname={classname}
				clicked={() => goToContacts()}
			>
				{text}
			</AccessButton>
		)
	}
}

const renderButtonReviews = (classname, text) => {
		
	const { show } = useAppContext()

	if(show){
		return (
			<AccessButton 
				classname={classname}
			>
				{text}
			</AccessButton>
		)
	} else {
		return (
			<AccessButton 
				classname={classname}
				clicked={() => goToReviews()}
			>
				{text}
			</AccessButton>
		)
	}
}

export { cardStd, headerStyle, renderButtonContacts, renderButtonReviews}
