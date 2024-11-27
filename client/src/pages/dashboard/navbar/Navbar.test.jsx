import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';
import { testsData } from '@services';
import { useContext } from 'react';

const updateUser = vi.fn();
const openNewPost = vi.fn();

beforeEach(() => {
  render(<Navbar updateUser={updateUser} openNewPost={openNewPost} />);
});

const mockUser = testsData.fullUser();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useContext: () => {
      return { user: mockUser };
    },
  };
});

describe('Navbar', () => {
  it('renders correctly', () => {
    expect(screen.queryByText(`@${mockUser.username}`)).not.toBeNull();
  });

  it('renders number of not seen notifications', () => {
    const numNotifications = 3;
    const mockUserWithNotifications = testsData.fullUser({ numNotifications });
    useContext.mockImplementationOnce(() => {
      return { user: mockUserWithNotifications };
    });
    expect(screen.queryByText(numNotifications)).not.toBeNull();
  });

  it('renders post button and use onNewPostClick on click', async () => {
    const user = userEvent.setup();
    const newPostBtn = screen.getByRole('button', { name: /post/i });
    await user.click(newPostBtn);
    expect(openNewPost).toHaveBeenCalledOnce();
  });

  it('calls updateUser when clicking on logOut button', async () => {
    const user = userEvent.setup();
    const settingsBtn = screen.getByRole('button', { name: /settings/i });
    await user.click(settingsBtn);
    const logOutBtn = screen.getByRole('button', { name: /logout/i });
    await user.click(logOutBtn);
    expect(updateUser).toHaveBeenCalledOnce();
  });
});
