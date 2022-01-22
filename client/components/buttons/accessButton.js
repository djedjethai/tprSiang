import React from 'react'

const AccessButton = (props) => {
	return (
		<button 
                	onClick={props.clicked}
			className={props.classname}
            	>
                {props.children}
            	</button>
	)
}

export default AccessButton
