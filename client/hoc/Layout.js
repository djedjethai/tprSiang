import {AppWrapper, useAppContext} from '../hooks/app-wrapper'

import Sidebar from '../components/navigation/sidebar'
import SmallSidebar from '../components/navigation/smallSidebar'
import Aux from './Aux'
import Footer from '../components/templates/footer'
import BannerLogoTop from '../components/templates/bannerLogoTop'

const Layout = (props) => {

	let { show, setShow } = useAppContext()

	const showSidebar = () => {
		setShow(true)
	}

	const hideSidebar = () => {
		setShow(false)
	}

	return 	(
		<Aux>
		<div className="container">
			<div className="content">

			{ show ? <Sidebar /> : <SmallSidebar clicked={() => showSidebar()} />}
			<div className="views">
			{ show ? 
				<div className="views__backdrop" onClick={() => hideSidebar()}>
					<BannerLogoTop />
					{props.children}
				</div> :
				<div className="views__component">
					<BannerLogoTop />
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


