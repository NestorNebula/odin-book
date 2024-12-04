import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './Searchbar';

const mockSubmit = vi.fn();
beforeEach(() => {
  render(<SearchBar onSubmit={mockSubmit} />);
});

describe('SearchBar', () => {
  it('calls onSubmit when typing a value', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox', { name: /search/i });
    await user.type(input, 'value');
    await user.keyboard('{Enter}');
    expect(mockSubmit).toHaveBeenCalledWith({ value: 'value' });
  });

  it("doesn't call onSubmit when typing no value", async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox', { name: /search/i });
    input.focus();
    await user.keyboard('{Enter}');
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
