import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMainPage } from '../actions';

import NavHor from '../components/global/NavHor';
import CardsHome from '../components/home/CardsHome';
import HeaderHome from '../components/home/HeaderHome';
import IntroHome from '../components/home/IntroHome';
import ReviewsHome from '../components/home/ReviewsHome';

class HomePage extends Component {
        
	componentDidMount() {
		this.props.fetchMainPage()
	}

	render() {	
		return (
        	        <div className="homePage">
				{ this.props.datas }
        	                <HeaderHome />
        	                <IntroHome />
        	                <NavHor />
        	                <CardsHome />
        	                <ReviewsHome />
        	        </div>
        	)   
	}
}


function mapStateToProps(state) {
	console.log('ds mapStateToProps')
	console.log(state)
	return { datas: state.mainpage }
}

function loadData(store) {
	return store.dispatch(fetchMainPage())
}


export default {
	loadData: loadData,
        component: connect(mapStateToProps, { fetchMainPage })(HomePage)
};




