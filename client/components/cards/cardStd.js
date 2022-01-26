import React from 'react'

const CardStd = (props) => {

	// <img src={props.carDetails.pic} style={{width:150}} /><br />

	return(
		<div onClick={props.clicked}>
			<img src={props.carDetails.pic} style={{width:300}}/><br />
			{props.carDetails.serie}<br/>
			{props.carDetails.price}<br/>
			{props.carDetails.style}<br/>
			{props.carDetails.engine}<br/>		
		</div>
	)
}

export default CardStd
