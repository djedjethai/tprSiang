export default (props) => {
	return (
		<div 
			className="views__backdrop"
			onClick={props.clicked}
		>
		{props.children}
		</div>
	)
}

