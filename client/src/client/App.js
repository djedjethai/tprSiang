import React from 'react';
import { renderRoutes } from 'react-router-config'; 

import BannerLogoTop from './components/global/BannerLogoTop';
import NavMain from './components/global/NavMain';
import Footer from './components/global/Footer';


const App = ({ route }) => {
	return (<div className="app">
			<BannerLogoTop />
			<NavMain />
			{renderRoutes(route.routes)}
			<Footer />
		</div>
	); 
};

// normaly we do a separate function but as it's a short one. 
// we include it directly as inline function inside the export default
// function loadData() {	
// }

export default {
	component: App
}

