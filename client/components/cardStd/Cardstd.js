import React from 'react'

const Cardstd = (props) => {
	
	return(
		<div key={props.refKey} onClick={props.clicked}>
			<img src={props.pic} style={{width:150}} /><br />
			{props.serie}<br/>
			{props.price}<br/>
			{props.style}<br/>
			{props.engine}<br/>		
		</div>
	)

}

export default Cardstd
