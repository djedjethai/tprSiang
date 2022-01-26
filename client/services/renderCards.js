import { useAppContext } from '../hooks/app-wrapper';

import HeaderStyle from '../components/cards/headerStyle'
import CardStd from '../components/cards/cardStd'
import GoToContact from '../components/cards/cardGlobal/goToContact'


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
				<GoToContact/>
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
				<GoToContact/>
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

export { cardStd, headerStyle }
