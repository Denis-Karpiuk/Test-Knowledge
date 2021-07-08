import { useEffect, useState } from 'react'

const correctTime = time => (String(time).length === 1 ? `0${time}` : `${time}`)
const formatTime = time => {
	const minutes = Math.floor(time / 60)
	const seconds = time % 60
	return `${correctTime(minutes)}: ${correctTime(seconds)}`
}
const Timer = ({ seconds, takeIsTimeLeft, testNumber }) => {
	const [count, setCount] = useState(seconds)
	useEffect(() => {
		let timer
		if (count > 0) timer = setTimeout(() => setCount(count => count - 1), 1000)
		if (count === 0 || count === 10) takeIsTimeLeft(count)
		return () => clearTimeout(timer)
	}, [count])
	useEffect(() => {
		setCount(seconds)
	}, [testNumber, seconds])
	return <div>{count > 0 ? formatTime(count) : 'Time Over'}</div>
}
export default Timer
