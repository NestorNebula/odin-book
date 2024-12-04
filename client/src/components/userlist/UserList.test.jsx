import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserList from './UserList';
import { testsData } from '@services';

const usersNumber = Math.random() * 10;
const users = [];
for (let i = 0; i < usersNumber; i++) {
  users.push(testsData.fullUser({ userId: i }));
}
const mockUpdate = vi.fn();

describe('UserList', () => {
  it('renders every user', () => {
    render(<UserList users={users} update={mockUpdate} />);
    expect(screen.queryAllByRole('button', { name: /follow/i }).length).toBe(
      users.length
    );
  });

  it('displays users bio when details is set to true', () => {
    render(<UserList users={users} details={true} update={mockUpdate} />);
  });

  it('calls update after following/unfollowing user', async () => {
    render(<UserList users={users} update={mockUpdate} />);
    const user = userEvent.setup();
    const followBtn = screen.getAllByRole('button', { name: /follow/i })[0];
    await user.click(followBtn);
    expect(mockUpdate).toHaveBeenCalled();
  });
});
