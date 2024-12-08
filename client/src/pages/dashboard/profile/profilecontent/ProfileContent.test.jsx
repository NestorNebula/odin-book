import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProfileContent from './ProfileContent';
import { testsData } from '@services';

const posts = [
  testsData.post({ details: true, authorId: 48 }),
  testsData.post({ details: true, file: true, type: 'COMMENT', authorId: 48 }),
  testsData.post({ details: true, file: true, type: 'COMMENT', authorId: 48 }),
];
const reposts = [
  testsData.interaction({ details: true, type: 'REPOST', userId: 48 }),
  testsData.interaction({ details: true, type: 'REPOST', userId: 48 }),
  testsData.interaction({ details: true, type: 'REPOST', userId: 48 }),
];
const likes = [
  testsData.interaction({ details: true, type: 'LIKE', userId: 48 }),
  testsData.interaction({ details: true, type: 'LIKE', userId: 48 }),
  testsData.interaction({ details: true, type: 'LIKE', userId: 48 }),
  testsData.interaction({ details: true, type: 'LIKE', userId: 48 }),
  testsData.interaction({ details: true, type: 'LIKE', userId: 48 }),
];

beforeEach(() => {
  render(
    <MemoryRouter>
      <ProfileContent
        content={{ posts, reposts, likes }}
        update={{ post: () => {}, repost: () => {}, likes: () => {} }}
        isUser={true}
      />
    </MemoryRouter>
  );
});

describe('ProfileContent', () => {
  it("renders user's posts", () => {
    expect(screen.queryAllByRole('button', { name: /bookmark/i })).toHaveLength(
      posts.filter((p) => p.type === 'POST').length +
        reposts.filter((r) => r.post.type === 'POST').length
    );
  });

  it("renders user's posts and comment when clicking on replies", async () => {
    const user = userEvent.setup();
    const repliesBtn = screen.getByRole('button', { name: /replies/i });
    await user.click(repliesBtn);
    expect(screen.queryAllByRole('button', { name: /bookmark/i })).toHaveLength(
      posts.length + reposts.length
    );
  });

  it("renders user's posts with file when clicking on media", async () => {
    const user = userEvent.setup();
    const mediaBtn = screen.getByRole('button', { name: /media/i });
    await user.click(mediaBtn);
    expect(screen.queryAllByRole('link')).toHaveLength(
      posts.filter((p) => p.file).length
    );
  });

  it("renders user's liked posts when clicking on likes", async () => {
    const user = userEvent.setup();
    const likesBtn = screen.getByRole('button', { name: /likes/i });
    await user.click(likesBtn);
    expect(screen.queryAllByRole('button', { name: /bookmark/i })).toHaveLength(
      likes.length
    );
  });
});
