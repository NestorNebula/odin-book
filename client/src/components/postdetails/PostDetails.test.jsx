import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostDetails from './PostDetails';
import { testsData } from '@services';

const commentedPost = testsData.post({ details: true, numComments: 1 });
const comment = testsData.post({
  details: true,
  numComments: 10,
  type: 'COMMENT',
  commentedPostId: commentedPost.id,
});
const post = { main: comment, next: commentedPost };
beforeEach(() => {
  render(
    <MemoryRouter>
      <PostDetails post={post} update={() => {}} />
    </MemoryRouter>
  );
});

describe('PostDetails', () => {
  it('renders main post', () => {
    expect(screen.queryByText(comment.content)).not.toBeNull();
  });

  it('renders commentedPost', () => {
    expect(screen.queryByText(commentedPost.content)).not.toBeNull();
  });

  it('renders all post comments', () => {
    expect(
      comment.comments.every((c) =>
        expect(screen.queryByText(c.content)).not.toBeNull()
      )
    ).toBeTruthy();
  });
});
