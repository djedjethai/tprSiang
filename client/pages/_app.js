import '../css/style.css'
import Header from '../components/header'
import buildClient from '../services/build-client'

const AppComponent = ({ Component, pageProps }) => {

	return 	(
		<div>
		<Header />
		<Component {...pageProps} />
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

