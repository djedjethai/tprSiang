import useBanner  from '../hooks/use-banner'

export default (pics) => {

		const { count } = useBanner(pics)
		
		if(pics.length > 0) {
			return (
				<div>
				<img src={pics[count].pic} className="slidingBanner" />
				</div>
			)
			
		} else {
			return (
				<div>
				<p>Banner under building</p>
				</div>
			)
		}
	}

