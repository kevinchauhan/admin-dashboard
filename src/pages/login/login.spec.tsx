import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Login from './login'

describe('login page', () => {
    it('should render with required field', () => {
        render(<Login />)
        // getBy -> throws an error
        // queryBy ->null
        // fingBy -> Async
        expect(screen.getByText('Sign in')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument()
        expect(screen.getByRole('checkbox', { name: 'Remember me' })).toBeInTheDocument()
        expect(screen.getByText('Forgot password')).toBeInTheDocument()
    })
})