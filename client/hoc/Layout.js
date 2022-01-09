import { useState } from 'react';

import Sidebar from '../components/navigation/sidebar'
import SmallSidebar from '../components/navigation/smallsidebar'
import Aux from './Aux'
import Footer from '../components/templates/footer'

const Layout = (props) => {

	const [show, setShow] = useState(false)

	const showSidebar = () => {
		setShow(true)
		console.log("myTest ", show)
	}

	const hideSidebar = () => {
		setShow(false)
		console.log("reTest: ", show)
	}

	return 	(
		<Aux>
		<div className="container">
			<div className="content">

			{ show ? <Sidebar /> : <SmallSidebar clicked={() => showSidebar()} />}
			<div className="views">
			{ show ? 
				<div className="views__backdrop" onClick={() => hideSidebar()}>
					{props.children}
				</div> :
				<div className="views__component">
					{props.children}
				</div>
			}
			</div>
			</div>
			<Footer/>
		</div>
		</Aux>
	)
}

export default Layout


