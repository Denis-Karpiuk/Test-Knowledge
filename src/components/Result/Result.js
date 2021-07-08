import s from './Result.module.css'

const Result = ({ point = 0, totalCount = 0, errors = 0 }) => {
	return (
		<div className={s.results}>
			<div>{`Sucsess: ${point}`}</div>
			<div>{`Errors: ${errors}`}</div>
			<div>{`Total count: ${totalCount}`}</div>
		</div>
	)
}
export default Result
