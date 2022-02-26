export default (props) => {
	return (
		<div className="detailInfos">
			<span className="detailInfos__title">{props.title}:</span>
			<span className="detailInfos__info">{props.info}</span>	
		</div>
	)
}


