import { render, screen } from '@testing-library/react'
import LoadingSpinner from '@/components/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('should render loading spinner with default message', () => {
    render(<LoadingSpinner />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render loading spinner with custom message', () => {
    const customMessage = 'Fetching data...'
    render(<LoadingSpinner message={customMessage} />)
    
    expect(screen.getByText(customMessage)).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('aria-label', 'Loading...')
  })

  it('should have proper accessibility attributes with custom message', () => {
    const customMessage = 'Fetching data...'
    render(<LoadingSpinner message={customMessage} />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('aria-label', customMessage)
  })
})
