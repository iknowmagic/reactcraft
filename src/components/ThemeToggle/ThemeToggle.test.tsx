import React from 'react'
import { render, screen } from '@testing-library/react'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  it('should render the component', () => {
    render(<ThemeToggle />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })
})
