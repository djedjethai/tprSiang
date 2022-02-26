import React from 'react'
import DisplayImage from '../ui/displayImage'
import ListElement from '../ui/listElement'

const CardCarDetails = (props) => {
		

	return(
		<div className="carDetails">

			<DisplayImage 
				imgsrc={props.carDts.pic} 
				classname=""
				imgsrcClassname="carDetails__img"
				imgalt="image-header"
			/>
			<div className="carDetails__serie">
				<h2 className="heading-2 carDetails__serie-h">{props.carDts.serie}</h2>
			</div>
			<div className="carDetails__info">
				<div className="carDetails__info-1">
					<ListElement
						title="SerieCar"
						info={props.carDts.serieDetails}
					/>
					<ListElement
						title="Grade"
						info={props.carDts.grade}
					/>
					<ListElement
						title="Engine"
						info={props.carDts.engine}
					/>
					<ListElement
						title="Style"
						info={props.carDts.style}
					/>
				</div>
				<div className="carDetails__info-2">
					<ListElement
						title="Price"
						info={props.carDts.price+" thb"}
					/>
					<ListElement
						title="Color"
						info={props.carDts.color}
					/>
					<ListElement
						title="Wheel"
						info={props.carDts.wheel}
					/>
					<ListElement
						title="Type"
						info={props.carDts.type}
					/>
				</div>
			</div>
			<div className="detailInfos__details">
				<span className="detailInfos__title">Details:</span>
				<span className="detailInfos__details-info">{props.carDts.details}</span>
			</div>
		</div>
	)
}

export default CardCarDetails
