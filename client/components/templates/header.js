import Link from 'next/link'

export default () => {
	return (
		<div>
		<h1>header</h1>
		<Link href="/">
			<a>หน๊าหลัก</a>
		</Link><br />
		<Link href="/type/[typeId]" as="/type/model">
			<a>รุนรถพิเศษ</a>
		</Link><br />
		<Link href="/type/[typeId]" as="/type/passenger">
			<a>รถยนฅ์นั่งส่วนบุคคล</a>
		</Link><br />
		<Link href="/type/[typeId]" as="/type/commercial">
			<a>รถยนฅ์เพื่อการพาณิซย์</a>
		</Link><br />
		<Link href="/type/[typeId]" as="/type/utility">
			<a>รถยนฅ์อเนกประสงค์</a>
		</Link><br />
		<Link href="/" >
			<a>second hand cars</a>
		</Link><br />
		<Link href="/contact" >
			<a>ติดต่อ</a>
		</Link><br />


		</div>
	)
}
