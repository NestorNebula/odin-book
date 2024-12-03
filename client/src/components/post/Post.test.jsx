import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Post from './Post';
import { testsData } from '@services';

const mockPost = testsData.post({
  details: true,
  numComments: 6,
  numInteractions: 10,
});
const mockClick = vi.fn();
beforeEach(() => {
  render(
    <Post
      post={mockPost}
      onReplyClick={mockClick}
      onRepostClick={mockClick}
      onLikeClick={mockClick}
      onBookmarkClick={mockClick}
    ></Post>
  );
});

describe('Post', () => {
  it('renders post', () => {
    expect(screen.queryByText(mockPost.content)).not.toBeNull();
    expect(screen.queryBytext(`@${mockPost.user.username}`)).not.toBeNull();
  });

  it('calls mockClick on reply/repost/like click', async () => {
    const user = userEvent.setup();
    const replyBtn = screen.getByRole('button', { name: /reply/i });
    await user.click(replyBtn);
    expect(mockClick).toHaveBeenCalledOnce();
    const repostBtn = screen.getByRole('button', { name: /repost/i });
    await user.click(repostBtn);
    const likeBtn = screen.getByRole('button', { name: /like/i });
    await user.click(likeBtn);
    const bookmarkBtn = screen.getByRole('button', { name: /bookmark/i });
    await user.click(bookmarkBtn);
    expect(mockClick).toHaveBeenCalledTimes(4);
  });
});
