import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { testsData } from '@services';
import { useContext } from 'react';
const openNewPost = vi.fn();

beforeEach(() => {
  render(
    <MemoryRouter>
      <Navbar openNewPost={openNewPost} />
    </MemoryRouter>
  );
});

const mockUser = testsData.fullUser({});
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: vi.fn(() => {
      return { user: mockUser };
    }),
  };
});

const numNotifications = 3;

describe('Navbar', () => {
  it('renders correctly', () => {
    expect(screen.queryByText(`@${mockUser.username}`)).not.toBeNull();
    const mockUserWithNotifications = testsData.fullUser({ numNotifications });
    useContext.mockImplementationOnce(() => {
      return { user: mockUserWithNotifications };
    });
  });

  it('renders number of not seen notifications', () => {
    expect(screen.getByText(numNotifications)).not.toBeNull();
  });

  it('renders post button and use onNewPostClick on click', async () => {
    const user = userEvent.setup();
    const newPostBtn = screen.getByRole('button', { name: /post/i });
    await user.click(newPostBtn);
    expect(openNewPost).toHaveBeenCalledOnce();
  });
});
