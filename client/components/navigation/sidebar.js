import Link from 'next/link'

import { useAppContext } from '../../hooks/app-wrapper';

export default (props) => {

	const { setShow } = useAppContext()

	const hideSidebar = () => {
		setShow(false)
	}

	return (
		<div className="sidebar">
			<div className="sidebar__items">
				<Link href="/" >
					<a onClick={() => hideSidebar()}>หน๊าหลัก</a>
				</Link><br />
				<Link href="/type/[typeId]" as="/type/model">
					<a onClick={() => hideSidebar()}>รุนรถพิเศษ</a>
				</Link><br />
				<Link href="/type/[typeId]" as="/type/passenger">
					<a onClick={() => hideSidebar()}>รถยนฅ์นั่งส่วนบุคคล</a>
				</Link><br />
				<Link href="/type/[typeId]" as="/type/commercial">
					<a onClick={() => hideSidebar()}>รถยนฅ์เพื่อการพาณิซย์</a>
				</Link><br />
				<Link href="/type/[typeId]" as="/type/utility">
					<a onClick={() => hideSidebar()}>รถยนฅ์อเนกประสงค์</a>
				</Link><br />
				<Link href="/" >
					<a onClick={() => hideSidebar()}>second hand cars</a>
				</Link><br />
				<Link href="/contact" >
					<a onClick={() => hideSidebar()}>ติดต่อ</a>
				</Link><br />
			</div>
		</div>
	)
}




