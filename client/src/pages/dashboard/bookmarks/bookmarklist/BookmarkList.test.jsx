import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import BookmarkList from './BookmarkList';
import { testsData } from '@services';

const numBookmarks = Math.random() * 9;
const bookmarks = [];
for (let i = 0; i <= numBookmarks; i++) {
  bookmarks.push(
    testsData.interaction({ details: true, type: 'BOOKMARK', userId: 48 })
  );
}
const mockClick = vi.fn();
beforeEach(() =>
  render(
    <MemoryRouter>
      <BookmarkList
        bookmarks={bookmarks}
        onBookmarkClick={mockClick}
        update={() => {}}
      />
    </MemoryRouter>
  )
);

describe('BookmarkList', () => {
  it('renders all bookmarks', () => {
    expect(screen.queryAllByRole('button', { name: /like/i }).length).toBe(
      Math.ceil(numBookmarks)
    );
  });

  it('calls onBookmarkClick when clicking on a post', async () => {
    const user = userEvent.setup();
    const bookmark = screen.getByText(bookmarks[0].post.content);
    await user.click(bookmark);
    expect(mockClick).toHaveBeenCalledWith(bookmarks[0].postId);
  });
});
