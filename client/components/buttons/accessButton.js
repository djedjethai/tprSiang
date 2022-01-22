import React from 'react'

const AccessButton = (props) => {
	return (
		<button 
                	onClick={props.clicked}
            	>
                {props.children}
            	</button>
	)
}

export default AccessButton
