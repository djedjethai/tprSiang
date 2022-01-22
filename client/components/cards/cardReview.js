import React from 'react'

const CardReview = (props) => {

	return(
		<div>
			<img src={props.reviewDetails.pic} style={{width:150}} /><br />
			{props.reviewDetails.name}<br/>
			{props.reviewDetails.comment}<br/>
			{props.reviewDetails.quand}<br/>		
		</div>
	)
}

export default CardReview