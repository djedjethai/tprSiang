import DisplayImage from '../ui/displayImage'

export default () => {
	return (
		<div className="thegrid">
			<div className="thegrid__presentation-logo">
				<DisplayImage 
					classname=""
					imgalt="logo with no background"
					imgsrc="/images/logoNoBackground.png"
					imgsrcClassname="thegrid__presentation-logo-image"
				/>
			</div>
			<div className="thegrid__presentation-moto">
				<p>ประสบการณ์งายขายกว่า 10 ปี ช่วยทุกคัน ดันให้ผ่าน ออกได้ทุกอาชีพ คุยกันก่อนได้นะคะ</p>
			</div>		
			<div className="thegrid__presentation-owner">
				<h2 className="heading-2">Top Seller</h2>
				<DisplayImage 
					classname=""
					imgalt="image seller"
					imgsrc="/images/siang.jpg"
					imgsrcClassname="thegrid__presentation-owner-image"
				/>
				<h4 className="heading-4">Siang</h4>
				<p className="thegrid__presentation-owner-container-perf">Sold more than 1000 cars</p>
			</div>
		</div>
	)
}
