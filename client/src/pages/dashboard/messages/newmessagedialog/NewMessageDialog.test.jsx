import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewMessageDialog from './NewMessageDialog';

const mockSubmit = vi.fn();
beforeEach(() => {
  render(
    <NewMessageDialog
      dialog={{ ref: null, close: () => {} }}
      onSubmit={mockSubmit}
      chats={[]}
    />
  );
});

describe('NewMessageDialog', () => {
  it("renders user's following as possibilities", () => {
    expect(
      screen.queryAllByRole('button', { name: /select/i, hidden: true }).length
    ).toBeGreaterThan(0);
  });

  it("doesn't call mockSubmit when no user is selected", async () => {
    const user = userEvent.setup();
    const submitBtn = screen.getByRole('button', {
      name: /next/i,
      hidden: true,
    });
    await user.click(submitBtn);
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('calls mock submit when a user is selected', async () => {
    const user = userEvent.setup();
    const submitBtn = screen.getByRole('button', {
      name: /next/i,
      hidden: true,
    });
    const selectBtn = screen.getAllByRole('button', {
      name: /select/i,
      hidden: true,
    })[0];
    await user.click(selectBtn);
    await user.click(submitBtn);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
