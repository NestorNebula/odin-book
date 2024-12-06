import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Chat from './Chat';
import { testsData } from '@services';

const userId = 48;
const numMessages = Math.ceil(Math.random() * 10);
const chat = testsData.chat({ numMessages, userId });

beforeEach(() => {
  render(
    <MemoryRouter>
      <Chat chat={chat} update={() => {}} />
    </MemoryRouter>
  );
});

describe('Chat', () => {
  it('renders other user informations', () => {
    expect(
      screen.queryByText(
        chat.users.find((user) => user.id !== userId).profile.displayName
      )
    ).not.toBeNull();
  });

  it('renders all existing messages', () => {
    expect(
      chat.messages.every((message) =>
        expect(screen.queryByText(message.content)).not.toBeNull()
      )
    ).toBeTruthy();
  });
});
