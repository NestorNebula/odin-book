import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PostForm } from '..';
import { testsData } from '@services';
import { faker } from '@faker-js/faker';

const mockUser = testsData.fullUser({});
const mockPost = testsData.post({ details: true });
const mockSubmit = vi.fn();

describe('PostForm', () => {
  it('displays normal placeholder for post', () => {
    render(
      <MemoryRouter>
        <PostForm userProfile={mockUser.profile} onSubmit={mockSubmit} />
      </MemoryRouter>
    );
    expect(screen.queryByPlaceholderText(/what is happening/i)).not.toBeNull();
  });

  it('displays special placeholder for comment', () => {
    render(
      <MemoryRouter>
        <PostForm
          userProfile={mockUser.profile}
          onSubmit={mockSubmit}
          post={mockPost}
        />
      </MemoryRouter>
    );
    expect(screen.queryByPlaceholderText(/what is happening/i)).toBeNull();
    expect(screen.queryByPlaceholderText(/post your reply/i)).not.toBeNull();
  });

  it('calls onSubmit only when content is not empty', async () => {
    const user = userEvent.setup();
    const submitBtn = screen.getByRole('button', { name: /post/i });
    await user.click(submitBtn);
    expect(mockSubmit).not.toHaveBeenCalled();
    const content = screen.getByPlaceholderText(/what is happening/i);
    await user.type(content, faker.lorem.paragraphs(1));
    await user.click(submitBtn);
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('prevents user from typing more than characters limit', async () => {
    const charactersLimit = 280;
    const user = userEvent.setup();
    const content = screen.getByPlaceholderText(/what is happening/i);
    await user.type(content, faker.lorem.paragraphs(5));
    expect(content.value.length).toBeLessThanOrEqual(charactersLimit);
  });
});
