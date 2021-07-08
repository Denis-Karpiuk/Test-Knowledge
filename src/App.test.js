import { render, screen } from '@testing-library/react'
import App from './App'

test('renders div main', () => {
	render(<App />)
	const div = screen.getByRole(/app/i)
	expect(div).toBeInTheDocument()
})
