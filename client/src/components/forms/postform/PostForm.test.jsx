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

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => {
      return { user: mockUser };
    },
  };
});

describe('PostForm', () => {
  it('displays normal placeholder for post', () => {
    render(
      <MemoryRouter>
        <PostForm onSubmit={mockSubmit} />
      </MemoryRouter>
    );
    expect(screen.queryByPlaceholderText(/what is happening/i)).not.toBeNull();
  });

  it('displays special placeholder for comment', () => {
    render(
      <MemoryRouter>
        <PostForm onSubmit={mockSubmit} post={mockPost} />
      </MemoryRouter>
    );
    expect(screen.queryByPlaceholderText(/what is happening/i)).toBeNull();
    expect(screen.queryByPlaceholderText(/post your reply/i)).not.toBeNull();
  });

  it('calls onSubmit only when content is not empty', async () => {
    <MemoryRouter>
      <PostForm onSubmit={mockSubmit} />
    </MemoryRouter>;
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
    <MemoryRouter>
      <PostForm onSubmit={mockSubmit} />
    </MemoryRouter>;
    const charactersLimit = 280;
    const user = userEvent.setup();
    const content = screen.getByPlaceholderText(/what is happening/i);
    await user.type(content, faker.lorem.paragraphs(5));
    expect(content.value.length).toBeLessThanOrEqual(charactersLimit);
  });
});
