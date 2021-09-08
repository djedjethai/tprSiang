import React from 'react'

const Accessbutton = (props) => {
	return (
		<button 
                	onClick={props.clicked}
            	>
                {props.children}
            	</button>
	)
}

export default Accessbutton
