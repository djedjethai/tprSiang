import Link from 'next/link'
import DisplayImage from '../ui/displayImage'

export default () => {
	return (
		<div className="footer">
			<div className="footer__company">
				<DisplayImage 
					classname="footer__company__logo"
					imgalt="logo footer"
					imgsrc="/images/logoGreyOk.jpg"		
					imgsrcClassname="footer__company__image"
				/>
				<div className="footer__menu">
					<Link href="/" >
						<a>หน๊าหลัก</a>
					</Link>
					<span> | </span>
					<Link href="/type/[typeId]" as="/type/model">
						<a>รุ่นรถพิเศษ</a>
					</Link>
					<span> | </span>
					<Link href="/type/[typeId]" as="/type/passenger">
						<a>รถยนฅ์นั่งส่วนบุคคล</a>
					</Link>
					<span> | </span>
					<Link href="/type/[typeId]" as="/type/commercial">
						<a>รถยนฅ์เพื่อการพาณิซย์</a>
					</Link>
					<span> | </span>
					<Link href="/type/[typeId]" as="/type/utility">
						<a>รถยนฅ์อเนกประสงค์</a>
					</Link>
					<span> | </span>
					<Link href="/" >
						<a>second hand cars</a>
					</Link>
					<span> | </span>
					<Link href="/contact" >
						<a>ติดต่อ</a>
					</Link>
				</div>	
			</div>
			<div className="footer__contact">
				<div className="footer__contact__list">
					<span className="material-icons footer__icons">facebook</span>
					<p className="footer__contact__text">Facebook</p>
				</div>
				<div className="footer__contact__list">
					<span className="material-icons footer__icons">email</span>
					<p className="footer__contact__text">siang@siang.com</p>
				</div>
				<div className="footer__contact__list">
					<span className="material-icons footer__icons">smartphone</span>
					<p className="footer__contact__text">0814304714</p>
				</div>
			</div>
			<div className="footer__moto">
				<h3 className="footer__moto__name heading-3">about us</h3>
				<p className="footer__moto__text">ประสบการณ์งายขายกว่า 10 ปี ช่วยทุกคัน ดันให้ผ่าน ออกได้ทุกอาชีพ คุยกันก่อนได้นะคะ</p>
			</div>
		</div>
	)
}
