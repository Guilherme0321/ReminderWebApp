import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InputWrapper from './inputWrapper';

describe('InputWrapper', () => {
    it('deve renderizar o input com label corretamente', () => {
        render(<InputWrapper id="nome" label="Nome" />);
        
        const input = screen.getByRole('textbox');
        const label = screen.getByText('Nome');
        
        expect(input).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(input.id).toBe('nome');
        expect(label.htmlFor).toBe('nome');
    });

    it('deve renderizar com o tipo correto de input', () => {
        render(<InputWrapper id="senha" label="Senha" type="password" />);
    
        const input = screen.getByLabelText('Senha');
        expect(input).toHaveAttribute('type', 'password');
    });    

    it('deve usar o tipo text como padrão quando não especificado', () => {
        render(<InputWrapper id="nome" label="Nome" />);
        
        const input = screen.getByRole('textbox');
        expect(input.type).toBe('text');
    });

    it('deve ter o atributo required', () => {
        render(<InputWrapper id="nome" label="Nome" />);
        
        const input = screen.getByRole('textbox');
        expect(input).toBeRequired();
    });

    it('deve chamar handleChange quando o valor é alterado', () => {
        const handleChange = vi.fn();
        render(<InputWrapper id="nome" label="Nome" handleChange={handleChange} />);
        
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'João' } });
        
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('deve renderizar com o valor inicial correto', () => {
        render(<InputWrapper id="nome" label="Nome" value="João" />);
        
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('João');
    });

    it('deve ter valor vazio como padrão quando não especificado', () => {
        render(<InputWrapper id="nome" label="Nome" />);
        
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('');
    });

    it('deve ter placeholder vazio', () => {
        render(<InputWrapper id="nome" label="Nome" />);
        
        const input = screen.getByRole('textbox');
        expect(input.placeholder).toBe('');
    });

    it('deve funcionar sem handleChange quando não especificado', () => {
        render(<InputWrapper id="nome" label="Nome" />);
        
        const input = screen.getByRole('textbox');
        expect(() => {
            fireEvent.change(input, { target: { value: 'teste' } });
        }).not.toThrow();
    });

    it('deve manter a associação entre label e input usando htmlFor e id', () => {
        render(<InputWrapper id="nome" label="Nome" />);
        
        const input = screen.getByRole('textbox');
        const label = screen.getByText('Nome');
        
        expect(input.id).toBe(label.htmlFor);
    });
});