export default (props) => {
	return (
		<div className={props.classname}>
			<img 
				src={props.imgsrc} 
				alt={props.imgalt}
				className={props.imgsrcClassname}
			/>
		</div>
	)
}


