import useBanner  from '../hooks/use-banner'

export default (pics) => {

		const { count } = useBanner(pics)
		
		if(pics.mainPics.length > 0) {
			return (
				<div>
				<img src={pics.mainPics[count].pic} style={{width:400}} />
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
