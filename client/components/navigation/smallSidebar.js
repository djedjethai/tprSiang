export default (props) => {

	return (
		<div 
			className="smallsidebar"
			onClick={props.clicked}
		>
			<span className="material-icons smallsidebar__icons">menu</span>
		</div>
	)
}


