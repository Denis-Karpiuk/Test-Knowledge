import { useEffect, useState } from 'react'
import Test from './Test/Test'

const TestKnowledgeContainer = ({ data }) => {
	const [state, setState] = useState(data)
	const [point, setPoint] = useState(0)
	const [errors, setErrors] = useState(0)
	const [testNumber, setTestNumber] = useState(0)
	const [isTimeLeft, setIsTimeLeft] = useState(true)
	const [testMode, setTestMode] = useState('startTest')
	const [isSucsessTest, setIsSucsessTest] = useState('')
	const [answerUser, setAnswerUser] = useState('')
	const [timerMode, setTimeMode] = useState(true)

	const allTests = state.filter(el => el.type === 'test')
	const test = allTests[testNumber]
	const totalQuestions = allTests.length
	const correctAnswer = test.options[0].correct
	const totalAnswered = point + errors
	const isCorrectAnswer =
		answerUser === correctAnswer && totalAnswered < totalQuestions

	const editTestMode = e => setTestMode(e.target.name)
	const takeIsTimeLeft = timeLeft => setIsTimeLeft(timeLeft)
	const takeUserAnswer = e => setAnswerUser(e.target.name)
	const changeTimerMode = () =>
		timerMode ? setTimeMode(false) : setTimeMode(true)
	const addPoint = () => {
		setPoint(point => point + 1)
		setIsSucsessTest('test__sucsess')
	}
	const addError = () => {
		setErrors(errors => errors + 1)
		setIsSucsessTest('test__error')
	}
	const resultTest = () =>
		point < Math.ceil(totalQuestions * 0.7) ? 'failTest' : 'sucsessTest'

	const nextTestNumber = () => {
		if (testNumber < totalQuestions - 1) {
			setTestNumber(testNumber => testNumber + 1)
			setIsSucsessTest()
			setIsTimeLeft(true)
			setAnswerUser('')
		}
	}

	useEffect(() => {
		if (testMode === 'startTest' || testMode === 'inProgress') {
			setTestNumber(0)
			setPoint(0)
			setErrors(0)
			setIsSucsessTest('')
		}
	}, [testMode])

	useEffect(() => {
		if (answerUser) {
			isCorrectAnswer && addPoint()
			!isCorrectAnswer && addError()
		}
		if (!isTimeLeft) addError()
	}, [answerUser, isTimeLeft])

	useEffect(() => {
		let id
		if (totalAnswered > 0) {
			id = setTimeout(() => nextTestNumber(), 1000)
			if (totalAnswered === totalQuestions) setTestMode(resultTest())
		}
		return () => {
			clearTimeout(id)
		}
	}, [point, errors])

	return (
		<div>
			<Test
				img={test.image}
				time={60}
				point={point}
				totalQuestions={totalQuestions}
				question={test.question}
				answers={test.options[1]}
				takeIsTimeLeft={takeIsTimeLeft}
				takeUserAnswer={takeUserAnswer}
				testMode={testMode}
				editTestMode={editTestMode}
				testNumber={testNumber}
				errors={errors}
				isSucsessTest={isSucsessTest}
				changeTimerMode={changeTimerMode}
				timerMode={timerMode}
				correctAnswer={correctAnswer}
				answerUser={answerUser}
			/>
		</div>
	)
}

export default TestKnowledgeContainer
