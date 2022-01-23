import Router from 'next/router'

import DisplayImage from '../ui/displayImage'
import AccessButton from '../buttons/accessButton'


const goToContact = () => {
		Router.push(`/contact`)
	}



export default () => {
	return (
		<div className="thegrid">
			<div className="thegrid__presentation-logo">
				<img 
					src="/images/carBrownRe.jpg" 
					alt="picture car for presentarion"
					className="thegrid__presentation-image1"
				/>
				<img 
					src="/images/logoNoBackground.png"
					alt="logo with no background"
					className="thegrid__presentation-image2"
				/>
			</div>
			<div className="thegrid__presentation-moto">
				<div className="thegrid__presentation-moto1">
					<h3 className="heading-3">Who are we</h3>
					<h2 className="heading-2 heading-2-light">Best place to buy Toyota</h2>
					<p className="thegrid__presentation-moto1-text">ประสบการณ์งายขายกว่า 10 ปี ช่วยทุกคัน ดันให้ผ่าน ออกได้ทุกอาชีพ คุยกันก่อนได้นะคะ</p>
					<AccessButton 
						classname="btn"
						clicked={() => goToContact()}
					>
						contact us
					</AccessButton>
				</div>		
				<div className="thegrid__presentation-moto2">
					<h3 className="heading-3">Top Seller</h3>
					<DisplayImage 
						classname=""
						imgalt="image seller"
						imgsrc="/images/siang.jpg"
						imgsrcClassname="thegrid__presentation-moto2-image"
					/>
					<h4 className="heading-4">Siang</h4>
					<p className="thegrid__presentation-owner-container-perf">Sold more than 1000 cars</p>
				</div>
			</div>
		</div>
	)
}
