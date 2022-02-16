import React from 'react'

const CardReview = (props) => {

	return(
		<div class="story">
                    	<figure class="story__shape">
				<img src={props.reviewDetails.pic} className="story__img" />
				<figcaption class="story__caption">
                            		{props.reviewDetails.name}
                        	</figcaption>

                    	</figure>
                    	<div class="story__text">
				<h5 class="heading-tertiary">Avis de: {props.reviewDetails.name} le:{props.reviewDetails.quand} </h5>
				<p>{props.reviewDetails.comment}</p>
		    	</div>
		</div>
	)
}

export default CardReview
