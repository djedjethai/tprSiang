import React from 'react'

const HeaderStyle = (props) => {

	return(
		<div className="style" onClick={props.clicked}>
			<img src={props.carDetails.pic} className="style__img" /><br />
			<h2 className="heading-2 style__choiced">{props.carDetails.serie}</h2>
			<div className="style__info">
				<div>
					<span className="material-icons style__icons">bookmark</span>
					<h4 className="heading-4 style__caracteristique">{props.carDetails.style}</h4>
				</div>
				<div>
					<span className="material-icons style__icons">loyalty</span>
					<h4 className="heading-4 style__caracteristique">{props.carDetails.grade}</h4>
				</div>
				<div>
					<span className="material-icons style__icons">build</span>
					<h4 className="heading-4 style__caracteristique">{props.carDetails.engine}</h4>
				</div>
				<div>
					<span className="material-icons style__icons">credit_card</span>
					<h4 className="heading-4 style__caracteristique">{props.carDetails.price} Thb</h4>
				</div>
			</div>
		</div>
	)
}

export default HeaderStyle
