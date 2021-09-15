import React from 'react'
import Router from 'next/router'

const goToContact = () => {
		Router.push(`/contact`)
	}


const Gotocontact = () => {
	return (
		<div onClick={() => goToContact()}>
		<p className="contactAccess">Contact us</p>
		</div>
	)
}

export default Gotocontact
