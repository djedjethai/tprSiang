import '../css/style.css'
import Head from 'next/head'

import buildClient from '../services/build-client'
import Layout from '../hoc/Layout'
import {AppWrapper, useAppContext} from '../hooks/app-wrapper'

const AppComponent = ({ Component, pageProps }) => {

	
	return 	(
		<AppWrapper>
			<Head>
				<title>tpr2u</title>
				<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,400i,700|Nunito:300,300i|Kanit:300|Sarabun:300" rel="stylesheet" />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AppWrapper>
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

