import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chats from './Chats';
import { testsData } from '@services';

const numMockChats = Math.random() * 9;
const mockChats = [];
for (let i = 0; i <= numMockChats; i++) {
  mockChats.push(testsData.chat({}));
}
const mockSetChat = vi.fn((chatId) => chatId);

describe('Chats', () => {
  it('renders all chats', () => {
    render(<Chats chat={null} chats={mockChats} setChat={mockSetChat} />);
    expect(screen.queryAllByRole('button', { name: /open/i }).length).toBe(
      mockChats.length
    );
  });

  it('calls setChat with chatId on click', async () => {
    render(<Chats chat={null} chats={mockChats} setChat={mockSetChat} />);
    const user = userEvent.setup();
    const userBtn = screen.getAllByRole('button', { name: /open/i })[0];
    await user.click(userBtn);
    expect(mockSetChat).toHaveReturnedWith(mockChats[0].id);
  });
});
