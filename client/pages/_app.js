import '../css/style.css'
import Header from '../components/header'
import axios from 'axios'

const AppComponent = ({ Component, pageProps, data }) => {

	return 	(
		<div>
		<Header />
		<Component picsmain={data} {...pageProps} />
		</div>
	)
}

AppComponent.getInitialProps = async (appContext) => {
        // console.log(Object.keys(appContext))
	const { data } = await axios.get(`http://api:5000/picsadvertise`)
	// console.log('picsmain from _app: ', data)

	const  picsmain = { data }

        // getInitialProps for individual page
        let pageProps = {}
        // only if the page got an initial props, as signup page won't for e.g
        if(appContext.Component.getInitialProps){
                pageProps = await appContext.Component.getInitialProps(appContext.ctx, picsmain.data)
        }

        return {
                pageProps,
                ...picsmain
        }
}

export default AppComponent
