import React from 'react'
import Router from 'next/router'

const goToContact = () => {
		Router.push(`/contact`)
	}


const GoToContact = () => {
	return (
		<div onClick={() => goToContact()}>
			<p className="btn-thai">ติดต่อ</p>
		</div>
	)
}

export default GoToContact
