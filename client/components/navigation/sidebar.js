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
					<a onClick={() => hideSidebar()}>หน้าหลัก</a>
				</Link><br />
				<Link href="/type/[typeId]" as="/type/model">
					<a onClick={() => hideSidebar()}>รถยนต์รุ่นพิเศษ</a>
				</Link><br />
				<Link href="/type/[typeId]" as="/type/passenger">
					<a onClick={() => hideSidebar()}>รถยนต์นั่งส่วนบุคคล</a>
				</Link><br />
				<Link href="/type/[typeId]" as="/type/commercial">
					<a onClick={() => hideSidebar()}>รถยนต์เพื่อการพาณิซย์</a>
				</Link><br />
				<Link href="/type/[typeId]" as="/type/utility">
					<a onClick={() => hideSidebar()}>รถยนต์อเนกประสงค์</a>
				</Link><br />
				<Link href="/contact" >
					<a onClick={() => hideSidebar()}>ติดต่อ</a>
				</Link><br />
			</div>
		</div>
	)
}




