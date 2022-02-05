import React from 'react'


const CardStd = (props) => {

	// <img src={props.carDetails.pic} style={{width:300}} /><br />

	return(
		<div className="standart" onClick={props.clicked}>
			<img src={props.carDetails.pic} className="standart__img" />
			<h5 className="standart__serie">{props.carDetails.serie}</h5>
			<div className="standart__style">
				<span className="material-icons standart__icons">bookmark</span>
				<p>{props.carDetails.style}</p>
			</div>
			<div className="standart__grade">
				<span className="material-icons standart__icons">loyalty</span>
				<p>{props.carDetails.grade}</p>
			</div>
			<div className="standart__engine">
				<span className="material-icons standart__icons ">build</span>
				<p>{props.carDetails.engine}</p>
			</div>
			<div className="standart__price">
				<span className="material-icons standart__icons">credit_card</span>
				<p>{props.carDetails.price} thb</p>
			</div>
		</div>
	)
}

export default CardStd
