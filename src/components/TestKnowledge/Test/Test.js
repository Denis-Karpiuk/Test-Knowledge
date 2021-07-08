import cn from 'classnames'
import fail from '../../../assets/failTest.jpg'
import sucsess from '../../../assets/jobOffer.jpg'
import start from '../../../assets/start.png'
import bg from '../../../assets/test.jpg'
import Result from '../../Result/Result'
import Timer from '../../Timer/Timer'
import './Test.css'

const results = {
	startTest: {
		message: 'Click start and test your knowledge!',
		bg: start,
	},
	sucsessTest: {
		message: 'Welcome to our team!!!',
		bg: sucsess,
	},
	failTest: {
		message: `Don't worry next time you will succeed !!!`,
		bg: fail,
	},
}

const Test = ({
	img,
	time,
	point,
	totalQuestions,
	question,
	answers,
	takeIsTimeLeft,
	takeUserAnswer,
	testMode,
	editTestMode,
	testNumber,
	errors,
	isSucsessTest,
	changeTimerMode,
	timerMode,
	correctAnswer,
}) => {
	let bacground = !img ? bg : img
	let testClass = cn('test', isSucsessTest)
	return (
		<>
			{testMode !== 'inProgress' ? (
				<div className={'test'}>
					<div className={'test__info'}>
						<div className={'test__img'}>
							<img src={results[testMode].bg} alt={'background'} />
						</div>
						{testMode !== 'inProgress' && testMode !== 'startTest' && (
							<div className={'test__counters'}>
								<div className={'test__result'}>
									<Result
										point={point}
										totalCount={totalQuestions}
										errors={errors}
										testMode={testMode}
									/>
								</div>
							</div>
						)}
						<div className={'test__message'}>
							<h1>{results[testMode].message}</h1>
						</div>
					</div>

					<div className={cn('button', 'test__start')}>
						<button name={'inProgress'} onClick={editTestMode}>
							{'Start'}
						</button>
					</div>
				</div>
			) : (
				<div className={testClass}>
					<div className={'test__info'}>
						<div className={'test__img'}>
							<img src={bacground} alt={'background'} />
						</div>
						<div className={'test__counters'}>
							<div onClick={changeTimerMode} className={'test__timer'}>
								{timerMode ? (
									<Timer
										seconds={time}
										testMode={testMode}
										testNumber={testNumber}
										takeIsTimeLeft={takeIsTimeLeft}
									/>
								) : (
									'Сlick to start the timer'
								)}
							</div>
							<div className={'test__result'}>
								<Result
									point={point}
									totalCount={totalQuestions}
									errors={errors}
								/>
							</div>
						</div>
						<div className={'test__question'}>
							<h1>{question}</h1>
						</div>
					</div>
					<div className={'test__answers'}>
						{answers.map(answer => (
							<div
								key={answer}
								className={
									answer === correctAnswer
										? cn({ correctAnswer: isSucsessTest }, 'button')
										: 'button'
								}
							>
								<button
									onClick={takeUserAnswer}
									name={answer}
									disabled={!!isSucsessTest}
								>
									{answer}
								</button>
							</div>
						))}
					</div>
					<div className={cn('button', 'test__finish')}>
						<button name={'startTest'} onClick={editTestMode}>
							{'Exit'}
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default Test
