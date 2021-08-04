import { useEffect, useState } from 'react'

export default ( pics ) => {
	const [count, setCount] = useState(0)
	
	let ref = 0

	useEffect(() => {
		const lgt = pics.mainPics.length
		
		const runCount = () => {
			if(lgt === 0) setCount(0)

			if(ref < lgt - 1) {
				ref++
				setCount(ref)
			}
			else {
				ref = 0
				setCount(ref)
			}
		}

		const inter = setInterval(runCount, 2000)


		return () => {
			clearInterval(inter)
		}
	},[])

	return { count }
}

