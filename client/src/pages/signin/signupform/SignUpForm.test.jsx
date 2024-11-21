import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from './SignUpForm';

const mockSubmit = vi.fn(() => {});
beforeEach(() => {
  render(<SignUpForm onSubmit={mockSubmit} />);
});

const getInputs = () => {
  const usernameInput = screen.getByLabelText(/username/i);
  const emailInput = screen.getByLabelText(/email/i);
  const pwdInput = screen.getByLabelText('password');
  const confirmPwdInput = screen.getByLabelText(/confirm/i);
  return { usernameInput, emailInput, pwdInput, confirmPwdInput };
};

const fillForm = async (user, username, email, password, confirm) => {
  const { usernameInput, emailInput, pwdInput, confirmPwdInput } = getInputs();
  await user.type(usernameInput, username);
  await user.type(emailInput, email);
  await user.type(pwdInput, password);
  await user.type(confirmPwdInput, confirm);
};

const clearForm = async (user) => {
  const { usernameInput, emailInput, pwdInput, confirmPwdInput } = getInputs();
  await user.clear(usernameInput);
  await user.clear(emailInput);
  await user.clear(pwdInput);
  await user.clear(confirmPwdInput);
};

describe('SignUpForm', () => {
  it('renders form', () => {
    expect(
      screen.queryAllByRole('textbox').length +
        screen.queryAllByLabelText(/password/i).length
    ).toBe(4);
  });

  it('displays errors when typing incorrect values', async () => {
    const user = userEvent.setup();
    await fillForm(user, 'usr', 'email', 'password', 'pasword');
    expect(screen.queryByText(/4 characters/i)).not.toBeNull();
    expect(screen.queryByText(/email format/i)).not.toBeNull();
    expect(screen.queryByText(/8 characters/i)).not.toBeNull();
    expect(screen.queryByText(/don't match/i)).not.toBeNull();
    await clearForm(user);
    expect(screen.queryByText(/enter a username/i)).not.toBeNull();
    expect(screen.queryByText(/enter an email/i)).not.toBeNull();
    expect(screen.queryByText(/enter a password/i)).not.toBeNull();
    expect(screen.queryByText(/confirm your password/i)).not.toBeNull();
  });

  it('only calls submit function when everything is correct', async () => {
    const user = userEvent.setup();
    const submitBtn = screen.getByRole('button', { name: /sign up/i });
    await fillForm(user, 'user', 'email@email.com', 'password', 'pasword');
    await user.click(submitBtn);
    expect(mockSubmit).not.toHaveBeenCalled();
    await clearForm(user);
    await fillForm(user, 'username', 'email@email.com', 'password', 'password');
    await user.click(submitBtn);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
