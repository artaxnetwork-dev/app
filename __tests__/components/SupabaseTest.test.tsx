import { render, screen, waitFor } from '@testing-library/react'
import SupabaseTest from '@/components/SupabaseTest'

// Mock the testSupabaseConnection function
jest.mock('@/lib/supabase', () => ({
  testSupabaseConnection: jest.fn(),
}))

import { testSupabaseConnection } from '@/lib/supabase'

const mockTestSupabaseConnection = testSupabaseConnection as jest.MockedFunction<typeof testSupabaseConnection>

describe('SupabaseTest', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render connection test component', () => {
    render(<SupabaseTest />)
    
    expect(screen.getByText('Supabase Connection Test')).toBeInTheDocument()
    expect(screen.getByText('Testing connection...')).toBeInTheDocument()
  })

  it('should show success message when connection is successful', async () => {
    mockTestSupabaseConnection.mockResolvedValue(true)

    render(<SupabaseTest />)

    await waitFor(() => {
      expect(screen.getByText('✅ Supabase connection successful!')).toBeInTheDocument()
    })

    expect(mockTestSupabaseConnection).toHaveBeenCalledTimes(1)
  })

  it('should show error message when connection fails', async () => {
    mockTestSupabaseConnection.mockResolvedValue(false)

    render(<SupabaseTest />)

    await waitFor(() => {
      expect(screen.getByText('❌ Supabase connection failed!')).toBeInTheDocument()
    })

    expect(mockTestSupabaseConnection).toHaveBeenCalledTimes(1)
  })

  it('should show error message when connection throws an error', async () => {
    mockTestSupabaseConnection.mockRejectedValue(new Error('Connection error'))

    render(<SupabaseTest />)

    await waitFor(() => {
      expect(screen.getByText('❌ Supabase connection failed!')).toBeInTheDocument()
    })

    expect(mockTestSupabaseConnection).toHaveBeenCalledTimes(1)
  })
})
