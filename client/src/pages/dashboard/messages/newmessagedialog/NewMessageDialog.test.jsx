import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewMessageDialog from './NewMessageDialog';

const mockSubmit = vi.fn();
beforeEach(() => {
  render(<NewMessageDialog onSubmit={mockSubmit} />);
});

describe('NewMessageDialog', () => {
  it("renders user's following as possibilities", () => {
    expect(
      screen.queryAllByRole('button', { name: /select/i }).length
    ).toBeGreaterThan(0);
  });

  it("doesn't call mockSubmit when no user is selected", async () => {
    const user = userEvent.setup();
    const submitBtn = screen.getByRole('button', { name: /next/i });
    await user.click(submitBtn);
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('calls mock submit when a user is selected', async () => {
    const user = userEvent.setup();
    const submitBtn = screen.getByRole('button', { name: /next/i });
    const selectBtn = screen.getAllByRole('button', { name: /select/i })[0];
    await user.click(selectBtn);
    await user.click(submitBtn);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
