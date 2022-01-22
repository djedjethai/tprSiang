import { useAppContext } from '../hooks/app-wrapper';

import HeaderStyle from '../components/cards/headerStyle'
import CardStd from '../components/cards/cardStd'
import GoToContact from '../components/cards/cardGlobal/goToContact'


const cardStd = (carDetailsRef, clickedRef, keyRef ) => {
	const { show } = useAppContext()
		
	if(show){
		return (
			<div key={keyRef}>
				<CardStd
					key={keyRef}
					carDetails={carDetailsRef}	
				/>
				<GoToContact/>
			</div>
		)
	} else {
		return (
			<div key={keyRef}>
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
