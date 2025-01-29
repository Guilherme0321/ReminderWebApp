import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ReminderRegister from './reminderRegister'
import { reminderService } from '../../service/ReminderService/reminderService'

vi.mock('../../components/Form/style', () => ({
  default: ({ children, onSubmit }) => (
    <form data-testid="form" onSubmit={onSubmit}>{children}</form>
  )
}))

vi.mock('../../components/InputWrapper/inputwrapper', () => ({
  default: ({ id, label, handleChange, value, type = 'text' }) => (
    <div data-testid={`input-wrapper-${id}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={handleChange}
        data-testid={`input-${id}`}
      />
    </div>
  )
}))

vi.mock('../../components/Button/style', () => ({
  Button: ({ children, type }) => (
    <button type={type} data-testid="submit-button">{children}</button>
  )
}))

vi.mock('./reminderList', () => ({
  default: () => <div data-testid="reminder-list">Reminder List</div>
}))

vi.mock('../../service/ReminderService/reminderService', () => ({
  reminderService: {
    create: vi.fn()
  }
}))

describe('ReminderRegister', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    delete window.location
    window.location = { reload: vi.fn() }
  })

  it('deve renderizar corretamente', () => {
    render(<ReminderRegister />)
    
    expect(screen.getByText('Criar Lembrete')).toBeInTheDocument()
    expect(screen.getByTestId('input-wrapper-name')).toBeInTheDocument()
    expect(screen.getByTestId('input-wrapper-date')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    expect(screen.getByTestId('reminder-list')).toBeInTheDocument()
  })

  it('deve atualizar o estado quando os inputs são alterados', () => {
    render(<ReminderRegister />)
    
    const nameInput = screen.getByTestId('input-name')
    const dateInput = screen.getByTestId('input-date')

    fireEvent.change(nameInput, { target: { value: 'Novo Lembrete' } })
    fireEvent.change(dateInput, { target: { value: '2025-12-31' } })

    expect(nameInput.value).toBe('Novo Lembrete')
    expect(dateInput.value).toBe('2025-12-31')
  })

  it('deve mostrar alerta quando a data é passada', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<ReminderRegister />)
    
    const nameInput = screen.getByTestId('input-name')
    const dateInput = screen.getByTestId('input-date')
    const form = screen.getByTestId('form')

    fireEvent.change(nameInput, { target: { value: 'Lembrete Teste' } })
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } })
    fireEvent.submit(form)

    expect(alertMock).toHaveBeenCalledWith('A data precisa ser futura!')
    expect(reminderService.create).not.toHaveBeenCalled()
  })

  it('deve criar lembrete com sucesso quando dados são válidos', async () => {
    reminderService.create.mockResolvedValueOnce({ data: { id: 1 } })
    render(<ReminderRegister />)
    
    const nameInput = screen.getByTestId('input-name')
    const dateInput = screen.getByTestId('input-date')
    const form = screen.getByTestId('form')

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const futureDateString = tomorrow.toISOString().split('T')[0]

    fireEvent.change(nameInput, { target: { value: 'Lembrete Teste' } })
    fireEvent.change(dateInput, { target: { value: futureDateString } })
    fireEvent.submit(form)

    await waitFor(() => {
      const expectedDate = new Date(futureDateString).toISOString()
      
      expect(reminderService.create).toHaveBeenCalledWith({
        name: 'Lembrete Teste',
        date: expectedDate
      })
      expect(window.location.reload).toHaveBeenCalled()
    })
  })

  it('deve lidar com erro na criação do lembrete', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const errorMessage = 'Erro ao criar lembrete'
    reminderService.create.mockRejectedValueOnce(new Error(errorMessage))
    
    render(<ReminderRegister />)
    
    const nameInput = screen.getByTestId('input-name')
    const dateInput = screen.getByTestId('input-date')
    const form = screen.getByTestId('form')

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const futureDateString = tomorrow.toISOString().split('T')[0]

    fireEvent.change(nameInput, { target: { value: 'Lembrete Teste' } })
    fireEvent.change(dateInput, { target: { value: futureDateString } })
    fireEvent.submit(form)

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao criar lembrete:', errorMessage)
      expect(window.location.reload).not.toHaveBeenCalled()
    })
  })
})