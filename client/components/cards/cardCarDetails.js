import React from 'react'

const CardCarDetails = (props) => {

	return(
		<div>
			<img src={props.carDts.pic} style={{width:700}} /><br />
			{props.carDts.color}<br/>
			{props.carDts.engine}<br/>		
			{props.carDts.grade}<br/>		
			{props.carDts.price}<br/>
			{props.carDts.serie}<br/>
			{props.carDts.serieDetails}<br/>
			{props.carDts.style}<br/>
			{props.carDts.type}<br/>
			{props.carDts.wheel}<br/>
			{props.carDts.details}<br/>
		</div>
	)
}

export default CardCarDetails
