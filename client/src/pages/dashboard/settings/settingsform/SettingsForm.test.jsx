import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsForm from './SettingsForm';

const mockSubmit = vi.fn();

describe('SettingsForm', () => {
  it('renders user form and calls submit function', async () => {
    render(<SettingsForm type="user" onSubmit={mockSubmit} />);
    const user = userEvent.setup();
    expect(screen.queryByLabelText(/username/i)).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).not.toBeNull();
    const submitBtn = screen.getByRole('button', { name: /save/i });
    await user.click(submitBtn);
    expect(mockSubmit).toHaveBeenCalled();
  });

  it("renders password form and calls submit function if password isn't empty", async () => {
    render(<SettingsForm type="password" onSubmit={mockSubmit} />);
    const user = userEvent.setup();
    const current = screen.getByLabelText(/current/i);
    const update = screen.getByLabelText(/new/i);
    const confirm = screen.getByLabelText(/confirm/i);
    const submitBtn = screen.getByRole('button', { name: /save/i });
    await user.click(submitBtn);
    expect(mockSubmit).not.toHaveBeenCalled();
    await user.type(current, 'currentpwd');
    await user.type(update, 'newpassword');
    await user.type(confirm, 'newpassword');
    await user.click(submitBtn);
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('renders logout form and calls submit function', async () => {
    render(<SettingsForm type="logout" onSubmit={mockSubmit} />);
    const user = userEvent.setup();
    const logOutBtn = screen.getByRole('button', { name: /log out/i });
    await user.click(logOutBtn);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
