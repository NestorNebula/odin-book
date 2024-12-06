import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageForm from './MessageForm';
import { testsData } from '@services';

const mockSubmit = vi.fn();
beforeEach(() => render(<MessageForm onSubmit={mockSubmit} />));

describe('MessageForm', () => {
  it('calls onSubmit only with data', async () => {
    const user = userEvent.setup();
    const submitBtn = screen.getByRole('button', { name: /send/i });
    await user.click(submitBtn);
    expect(mockSubmit).not.toHaveBeenCalled();
    const input = screen.getByPlaceholderText(/message/i);
    await user.type(input, testsData.message({}).content);
    await user.click(submitBtn);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
