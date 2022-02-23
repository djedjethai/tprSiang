import * as React from 'react'

const CardReview = (props) => {

	const formatDate = () => {
		// console.log("alllo: ", props.reviewDetails.quand.split('T')[0])
		return props.reviewDetails.quand.split('T')[0]
	}

	// {props.reviewDetails.quand} 

	return(
		<div class="story">
                    	<figure class="story__shape">
				<img src={props.reviewDetails.pic} className="story__img" />
				<figcaption class="story__caption">
                            		{props.reviewDetails.name}
                        	</figcaption>

                    	</figure>
                    	<div class="story__text">
				<h5 class="heading-tertiary story__text-details">
					<div className="story__text-details-blc">
						<span className="story__text-mr"> ท่าน: </span> 
						{props.reviewDetails.name}
					</div>
					<div className="story__text-details-blc">
					<span className="story__text-mr"> วันที: </span>
						{formatDate()}
					</div>
				</h5>
				<p class="story__text-comment">{props.reviewDetails.comment}</p>
		    	</div>
		</div>
	)
}

export default CardReview
