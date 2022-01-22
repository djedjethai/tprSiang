import React from 'react'

const ContactButton = (props) => {
	return (
		<button 
                	onClick={props.clicked}
            	>
                {props.children}
            	</button>
	)
}

export default ContactButton
