import { useAppContext } from '../hooks/app-wrapper';

import Headerstyle from '../components/cards/Headerstyle'
import Cardstd from '../components/cards/Cardstd'
import Gotocontact from '../components/cards/cardGlobal/Gotocontact'


export default (cardRef, carDetailsRef, clickedRef, keyRef ) => {

		const { show } = useAppContext()
		
		if(show && cardRef === "cardstd"){
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

		if(show && cardRef === "headerstyle"){
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

