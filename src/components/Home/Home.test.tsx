import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './index'

describe('Home component', () => {
  it('renders welcome text', () => {
    render(<Home />)
    expect(screen.getByText(/Welcome Home/i)).toBeInTheDocument()
  })
})
