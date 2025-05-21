import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JSEditor from '../JSEditor';

jest.mock('react-ace', () => ({
    __esModule: true,
    default: jest.fn(({ onChange, value, keyboardHandler }) => (
        <textarea
            data-testid="ace-editor-mock"
            onChange={(e) => onChange(e.target.value)}
            value={value}
            data-keyboard-handler={keyboardHandler} // Pass keyboardHandler for testing
        />
    )),
}));

describe('JSEditor', () =>
{
    const mockOnChange = jest.fn();

    beforeEach(() =>
    {
        mockOnChange.mockClear();
    });

    test('renders the editor and title', () =>
    {
        render(<JSEditor onChange={mockOnChange} value="console.log('hello');" />);

        expect(screen.getByText('Edit your code here:')).toBeInTheDocument();
        expect(screen.getByTestId('ace-editor-mock')).toBeInTheDocument();
        expect(screen.getByTestId('ace-editor-mock')).toHaveValue("console.log('hello');");
    });

    test('calls onChange when editor content changes', () =>
    {
        render(<JSEditor onChange={mockOnChange} value="" />);

        const editor = screen.getByTestId('ace-editor-mock');
        fireEvent.change(editor, { target: { value: 'new code' } });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith('new code');
    });

    test('Vim Mode toggle enables and disables Vim keyboardHandler', () =>
    {
        render(<JSEditor onChange={mockOnChange} value="" />);

        const vimModeSwitch = screen.getByRole('checkbox', { name: 'Vim Mode' });
        const editor = screen.getByTestId('ace-editor-mock');

        // Initially, Vim mode should be off (keyboardHandler should be null)
        expect(editor).toHaveAttribute('data-keyboard-handler', 'null');

        // Toggle on
        fireEvent.click(vimModeSwitch);
        expect(vimModeSwitch).toBeChecked();
        expect(editor).toHaveAttribute('data-keyboard-handler', 'vim');

        // Toggle off
        fireEvent.click(vimModeSwitch);
        expect(vimModeSwitch).not.toBeChecked();
        expect(editor).toHaveAttribute('data-keyboard-handler', 'null');
    });
});