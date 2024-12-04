import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HomeContent from './HomeContent';
import { testsData } from '@services';

const posts = [
  testsData.post({ details: true, numInteractions: 3 }),
  testsData.post({ details: true, numInteractions: 10 }),
  testsData.post({ details: true, type: 'COMMENT' }),
];
const reposts = [
  testsData.interaction({ details: true, type: 'REPOST' }),
  testsData.interaction({ details: true, type: 'REPOST' }),
];

beforeEach(() => {
  render(
    <MemoryRouter>
      <HomeContent
        content={{ posts, followingPosts: posts, reposts }}
        updateContent={() => {}}
        updateInformation={() => {}}
      ></HomeContent>
    </MemoryRouter>
  );
});

describe('HomeContent', () => {
  it('renders all posts', () => {
    expect(screen.queryAllByRole('button', { name: /like/i }).length).toBe(
      posts.length
    );
  });

  it('renders all posts and reposts in following section', async () => {
    const user = userEvent.setup();
    const followingSectionBtn = screen.getByRole('button', {
      name: /following/i,
    });
    await user.click(followingSectionBtn);
    expect(screen.queryAllByRole('button', { name: /like/i }).length).toBe(
      posts.length + reposts.length
    );
  });
});
