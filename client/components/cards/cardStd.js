import React from 'react'

const CardStd = (props) => {

	// <img src={props.carDetails.pic} style={{width:300}} /><br />

	return(
		<div className="standart" onClick={props.clicked}>
			<img src={props.carDetails.pic} className="standart__img" /><br />
			<h5 className="standart__serie">{props.carDetails.serie}</h5>
			<div className="standart__style">
				<svg>
				<use xlink:href="/svg/sprite.svg#icon-shield"></use>
				</svg>
				<p>{props.carDetails.style}</p>
			</div>
			<div className="standart__grade">
				<svg>
				<use xlink:href="/svg/sprite.svg#icon-trophy"></use>
				</svg>
				<p>{props.carDetails.grade}</p>
			</div>
			<div className="standart__engine">
				<svg>
				<use xlink:href="/svg/sprite.svg#icon-gauge"></use>
				</svg>
				<p>{props.carDetails.engine}</p>
			</div>
			<div className="standart__price">
				<svg>
				<use xlink:href="/svg/sprite.svg#icon-credit-card"></use>
				</svg>
				<p>{props.carDetails.price}</p>
			</div>
		</div>
	)
}

export default CardStd
