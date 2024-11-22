import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

const mockSubmit = vi.fn(() => {});
beforeEach(() => {
  render(<LoginForm onSubmit={mockSubmit} />);
});

describe('LoginForm', () => {
  it('renders correctly', () => {
    expect(screen.queryByLabelText(/username/i)).not.toBeNull();
    expect(screen.queryByLabelText(/password/i)).not.toBeNull();
  });

  it('displays error mesages when incorrect data are submitted', async () => {
    const user = userEvent.setup();
    const usermailInput = screen.getByLabelText(/username/i);
    await user.type(usermailInput, 'username');
    await user.clear(usermailInput);
    expect(screen.queryByText(/enter a username/i)).not.toBeNull();
    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, 'pwd');
    expect(screen.queryByText(/8 characters/i)).not.toBeNull();
    await user.clear(passwordInput);
    expect(screen.queryByText(/enter a password/i)).not.toBeNull();
  });

  it('only submits form when values are correct', async () => {
    const user = userEvent.setup();
    const submitBtn = screen.getByRole('button', { name: /log in/i });
    await user.click(submitBtn);
    expect(mockSubmit).not.toHaveBeenCalled();
    const usermailInput = screen.getByLabelText(/username/i);
    await user.type(usermailInput, 'username');
    await user.click(submitBtn);
    expect(mockSubmit).not.toHaveBeenCalled();
    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, 'password');
    await user.click(submitBtn);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
