import {AppWrapper, useAppContext} from '../hooks/app-wrapper'

import Sidebar from '../components/navigation/sidebar'
import SmallSidebar from '../components/navigation/smallSidebar'
import Aux from './Aux'
import Footer from '../components/templates/footer'
import DisplayImage from '../components/ui/displayImage'

const Layout = (props) => {

	let { show, setShow } = useAppContext()

	const showSidebar = () => {
		setShow(true)
	}

	const hideSidebar = () => {
		setShow(false)
	}

	const displayImage = () => {
		return <DisplayImage 
				classname="bannerLogoContainer"
				imgalt="image banner top"
				imgsrc="/images/logoGreyOk.jpg"
				imgsrcClassname="bannerLogoContainer__image"
			/>
	}

	return 	(
		<Aux>
		<div className="container">
			<div className="content">

			{ show ? <Sidebar /> : <SmallSidebar clicked={() => showSidebar()} />}
			<div className="views">
			{ show ? 
				<div className="views__backdrop" onClick={() => hideSidebar()}>
					{displayImage()}
					{props.children}
					<Footer/>
				</div> :
				<div className="views__component">
					{displayImage()}
					{props.children}
					<Footer/>
				</div>
			}
			</div>
			</div>
		</div>
		</Aux>
	)
}

export default Layout


