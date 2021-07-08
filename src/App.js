import './App.css'
import TestKnowledgeContainer from './components/TestKnowledge/TestKnowledgeContainer'
//импортируем json файл, который затем передаём в комопнент
import testData from './TestData.json'

function App() {
	return (
		<div role={'app'} className='App'>
			<div className={'test1'}>
				<TestKnowledgeContainer data={testData} />
			</div>
		</div>
	)
}

export default App
