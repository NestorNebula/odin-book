import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotificationList from './NotificationList';
import { testsData } from '@services';

const notificationsNumber = Math.random() * 9;
const notifications = [];
const types = {
  follow: 0,
  comment: 0,
  like: 0,
  repost: 0,
};
for (let i = 0; i <= notificationsNumber; i++) {
  const notification = testsData.notification({ userId: i });
  switch (notification.notificationType) {
    case 'FOLLOW':
      types.follow += 1;
      break;
    case 'COMMENT':
      types.comment += 1;
      break;
    case 'LIKE':
      types.like += 1;
      break;
    case 'REPOST':
      types.repost += 1;
      break;
    default:
      throw new Error('Incorrect notification type.');
  }
  notifications.push(notification);
}

beforeEach(() => {
  render(
    <MemoryRouter>
      <NotificationList notifications={notifications} />
    </MemoryRouter>
  );
});

describe('NotificationList', () => {
  it('renders all notifications correctly', () => {
    expect(screen.queryAllByText(/followed/i).length).toBe(types.follow);
    expect(screen.queryAllByText(/commented/i).length).toBe(types.comment);
    expect(screen.queryAllByText(/liked/i).length).toBe(types.like);
    expect(screen.queryAllByText(/reposted/i).length).toBe(types.repost);
  });
});
