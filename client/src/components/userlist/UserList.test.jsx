import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserList from './UserList';
import { testsData } from '@services';

const usersNumber = Math.random() * 9;
const users = [];
for (let i = 0; i <= usersNumber; i++) {
  users.push(testsData.fullUser({ userId: i }));
}

describe('UserList', () => {
  it('renders every user', () => {
    render(<UserList users={users} />);
    expect(screen.queryAllByRole('button', { name: /follow/i }).length).toBe(
      users.length
    );
  });

  it('displays users bio when details is set to true', () => {
    render(<UserList users={users} details={true} />);
    expect(screen.queryByText(users[0].profile.bio)).not.toBeNull();
  });
});
