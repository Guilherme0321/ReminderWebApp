import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ReminderList from './reminderList';
import { reminderService } from '../../service/ReminderService/reminderService';
import * as useFetchModule from '../../hook/useFetch';

// Mock dos módulos
vi.mock('../../hook/useFetch');
vi.mock('../../service/ReminderService/reminderService');

describe('ReminderList', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('deve exibir mensagem de carregamento', () => {
        vi.spyOn(useFetchModule, 'default').mockReturnValue({
            loading: true,
            error: null,
            data: null
        });

        render(<ReminderList />);
        expect(screen.getByText('Carregando')).toBeInTheDocument();
    });

    it('deve exibir mensagem de erro quando houver falha', () => {
        const errorMessage = 'Erro ao carregar dados';
        vi.spyOn(useFetchModule, 'default').mockReturnValue({
            loading: false,
            error: new Error(errorMessage),
            data: null
        });

        render(<ReminderList />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('deve exibir mensagem quando não houver dados', () => {
        vi.spyOn(useFetchModule, 'default').mockReturnValue({
            loading: false,
            error: null,
            data: []
        });

        render(<ReminderList />);
        expect(screen.getByText('Sem dados disponíveis')).toBeInTheDocument();
    });

    it('deve renderizar lista de lembretes corretamente', () => {
        const mockData = [
            { name: 'Lembrete 1', date: '2024-01-29T00:00:00.000Z' },
            { name: 'Lembrete 2', date: '2024-01-29T00:00:00.000Z' },
            { name: 'Lembrete 3', date: '2024-01-30T00:00:00.000Z' }
        ];

        vi.spyOn(useFetchModule, 'default').mockReturnValue({
            loading: false,
            error: null,
            data: mockData
        });

        render(<ReminderList />);
        
        expect(screen.getByText('Lista de Lembretes')).toBeInTheDocument();
        expect(screen.getByText('Lembrete 1')).toBeInTheDocument();
        expect(screen.getByText('Lembrete 2')).toBeInTheDocument();
        expect(screen.getByText('Lembrete 3')).toBeInTheDocument();
    });

    it('deve chamar função de deletar quando o botão for clicado', async () => {
        const mockData = [
            { name: 'Lembrete 1', date: '2024-01-29T00:00:00.000Z' }
        ];

        vi.spyOn(useFetchModule, 'default').mockReturnValue({
            loading: false,
            error: null,
            data: mockData
        });

        const deleteSpy = vi.spyOn(reminderService, 'delete').mockResolvedValue();
        const originalLocation = window.location;
        delete window.location;
        window.location = { reload: vi.fn() };

        render(<ReminderList />);
        
        const deleteButton = screen.getByText('x');
        await fireEvent.click(deleteButton);

        expect(deleteSpy).toHaveBeenCalledWith({
            name: 'Lembrete 1',
            date: '2024-01-29T00:00:00.000Z'
        });
        expect(window.location.reload).toHaveBeenCalled();

        window.location = originalLocation;
    });

    it('deve lidar com erro ao deletar lembrete', async () => {
        const mockData = [
            { name: 'Lembrete 1', date: '2024-01-29T00:00:00.000Z' }
        ];

        vi.spyOn(useFetchModule, 'default').mockReturnValue({
            loading: false,
            error: null,
            data: mockData
        });

        const consoleSpy = vi.spyOn(console, 'log');
        const error = new Error('Erro ao deletar');
        vi.spyOn(reminderService, 'delete').mockRejectedValue(error);

        render(<ReminderList />);
        
        const deleteButton = screen.getByText('x');
        await fireEvent.click(deleteButton);

        expect(consoleSpy).toHaveBeenCalledWith(error.message);
    });
});