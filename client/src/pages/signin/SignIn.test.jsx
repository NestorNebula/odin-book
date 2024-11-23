import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from './SignIn';

beforeEach(() => {
  render(<SignIn />);
});
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => {
      return [
        {
          get: () => {
            return null;
          },
        },
      ];
    },
  };
});

describe('SignIn', () => {
  it('display forms when clicking on corresponding buttons', async () => {
    const user = userEvent.setup();
    const signUpFormBtn = screen.getByRole('button', {
      name: /create account/i,
    });
    await user.click(signUpFormBtn);
    expect(screen.queryByLabelText(/confirm password/i)).not.toBeNull();
    let closeBtn = screen.getByRole('button', { name: /close/i });
    await user.click(closeBtn);
    const logInFormBtn = screen.getByRole('button', { name: /log in/i });
    await user.click(logInFormBtn);
    expect(screen.queryByLabelText(/username\/email/i)).not.toBeNull();
  });
});
