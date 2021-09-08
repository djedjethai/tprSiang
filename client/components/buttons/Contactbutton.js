import React from 'react'

const Contactbutton = (props) => {
	return (
		<button 
                	onClick={props.clicked}
            	>
                {props.children}
            	</button>
	)
}

export default Contactbutton
