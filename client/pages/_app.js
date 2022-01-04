import '../css/style.css'
import { useState } from 'react';

// import Navbar from '../components/templates/navbar'
import Footer from '../components/templates/footer'
import Sidebar from '../components/navigation/sidebar'
import SmallSidebar from '../components/navigation/smallsidebar'
import Backdrop from '../components/ui/backdrop'
import buildClient from '../services/build-client'

// import { AppWrapper, useAppContext } from '../hooks/app-wrapper';

const AppComponent = ({ Component, pageProps }) => {

	// const { show } = useAppContext()
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
		<div className="container">
			<div className="content">
		{ show ? <Sidebar /> : <SmallSidebar clicked={() => showSidebar()} />}
		{ show ? <Backdrop clicked={() => hideSidebar()}/> : <Component {...pageProps} />}
			</div>
			<Footer />
		</div>
	)
}

export default AppComponent




AppComponent.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx)

        // getInitialProps for individual page
        let pageProps = {}
        // only if the page got an initial props, as signup page won't for e.g
        if(appContext.Component.getInitialProps){
                pageProps = await appContext.Component.getInitialProps(appContext.ctx, client)
        }

        return {
                pageProps
        }
}

