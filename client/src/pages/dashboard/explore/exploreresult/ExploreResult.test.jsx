import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ExploreResult from './ExploreResult';
import { testsData } from '@services';

const postsNumber = Math.random() * 9;
const mockPosts = [];
for (let i = 0; i <= postsNumber; i++) {
  mockPosts.push(
    testsData.post({
      file: Math.random() > 0.5 ? true : false,
      type: Math.random() < 0.5 ? 'POST' : 'COMMENT',
    })
  );
}
const usersNumber = Math.random() * 9;
const mockUsers = [];
for (let i = 0; i <= usersNumber; i++) {
  mockUsers.push(testsData.user({ userId: i }));
}

beforeEach(() => {
  render(
    <MemoryRouter>
      <ExploreResult posts={mockPosts} users={mockUsers} />
    </MemoryRouter>
  );
});

describe('ExploreResult', () => {
  it('renders all posts', () => {
    expect(screen.queryAllByRole('button', { name: /like/i }).length).toBe(
      mockPosts.length
    );
  });

  it('renders users when clicking on People', async () => {
    const user = userEvent.setup();
    const peopleBtn = screen.getByRole('button', { name: /people/i });
    await user.click(peopleBtn);
    expect(screen.queryAllByRole('button', { name: /follow/i }).length).toBe(
      mockUsers.length
    );
  });

  it('renders only posts having media when clicking on Media', async () => {
    const user = userEvent.setup();
    const mediaBtn = screen.getByRole('button', { name: /media/i });
    await user.click(mediaBtn);
    expect(screen.queryAllByRole('link').length).toBe(
      mockPosts.filter((post) => !!post.file).length
    );
  });

  it('renders posts from newest to oldest when clicking on Latest', async () => {
    const user = userEvent.setup();
    const latestBtn = screen.getByRole('button', { name: /latest/i });
    const orderedPosts = mockPosts.toSorted(
      (a, b) => b.creationDate - a.creationDate
    );
    await user.click(latestBtn);
    expect(screen.queryAllByRole('link')[0]).toHaveAttribute(
      'href',
      `/${orderedPosts[0].userId}`
    );
  });
});
