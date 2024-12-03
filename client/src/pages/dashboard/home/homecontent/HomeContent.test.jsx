import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomeContent from './HomeContent';
import { testsData } from '@services';

const posts = [
  testsData.post({ details: true, numInteractions: 3 }),
  testsData.post({ details: true, numInteractions: 10 }),
  testsData.post({ details: true, type: 'COMMENT' }),
];
const reposts = [
  testsData.post({ details: true }),
  testsData.post({ details: true }),
];

beforeEach(() => {
  render(<HomeContent posts={posts} reposts={reposts}></HomeContent>);
});

describe('Home', () => {
  it('renders all posts', () => {
    expect(screen.queryAllByRole('button', { name: /like/i }).length).toBe(
      posts.length
    );
  });

  it('renders al posts and reposts in following section', async () => {
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
