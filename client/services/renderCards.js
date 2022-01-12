import { useAppContext } from '../hooks/app-wrapper';

import Headerstyle from '../components/cards/Headerstyle'
import Cardstd from '../components/cards/Cardstd'
import Gotocontact from '../components/cards/cardGlobal/Gotocontact'


const cardStd = (carDetailsRef, clickedRef, keyRef ) => {
	const { show } = useAppContext()
		
	if(show){
		return (
			<div key={keyRef}>
				<Cardstd
					key={keyRef}
					carDetails={carDetailsRef}	
				/>
				<Gotocontact/>
			</div>
		)
	} else {
		return (
			<div key={keyRef}>
				<Cardstd
					key={keyRef}
					carDetails={carDetailsRef}	
					clicked={clickedRef}
				/>
				<Gotocontact/>
			</div>
		)
	}
}

const headerStyle = (carDetailsRef, clickedRef) => {
		
	const { show } = useAppContext()

	if(show){
		return (
			<Headerstyle
				carDetails={carDetailsRef}	
			/>
		)
	} else {
		return (
			<Headerstyle
				carDetails={carDetailsRef}	
				clicked={clickedRef}
			/>
		)
	}
}

export { cardStd, headerStyle }
