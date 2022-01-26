import Link from 'next/link'


export default (props) => {
	return (
		<div className="navbar">
			<Link href="/" >
				<a className="btn-link">หน๊าหลัก</a>
			</Link>
			<Link href="/type/[typeId]" as="/type/model">
				<a className="btn-link">รุนรถพิเศษ</a>
			</Link>
			<Link href="/type/[typeId]" as="/type/passenger">
				<a className="btn-link">รถยนฅ์นั่งส่วนบุคคล</a>
			</Link>
			<Link href="/type/[typeId]" as="/type/commercial">
				<a className="btn-link">รถยนฅ์เพื่อการพาณิซย์</a>
			</Link>
			<Link href="/type/[typeId]" as="/type/utility">
				<a className="btn-link">รถยนฅ์อเนกประสงค์</a>
			</Link>
			<Link href="/" >
				<a className="btn-link">second hand cars</a>
			</Link>
			<Link href="/contact" >
				<a className="btn-link">ติดต่อ</a>
			</Link>
		</div>
	)
}

