import React from 'react'
import Router from 'next/router'

const goToContact = () => {
		Router.push(`/contact`)
	}


const GoToContact = () => {
	return (
		<div onClick={() => goToContact()}>
		<p className="contactAccess">Contact us</p>
		</div>
	)
}

export default GoToContact