import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import { testsData } from '@services';

describe('ProfileHeader', () => {
  it("renders given user's profile", () => {
    const user = testsData.fullUser({});
    render(
      <MemoryRouter>
        <ProfileHeader user={user} isUser={false} />
      </MemoryRouter>
    );
    expect(screen.queryByText(user.profile.displayName)).not.toBeNull();
    expect(screen.queryByText(`@${user.username}`)).not.toBeNull();
  });

  it('renders profile dialog when given user is user', () => {
    const user = testsData.fullUser({ userId: 48 });
    render(
      <MemoryRouter>
        <ProfileHeader user={user} isUser={true} />
      </MemoryRouter>
    );
    expect(
      screen.queryByRole('button', { name: /edit profile/i })
    ).not.toBeNull();
  });

  it("renders follow button when given user isn't user", () => {
    const user = testsData.fullUser({});
    render(
      <MemoryRouter>
        <ProfileHeader user={user} isUser={false} />
      </MemoryRouter>
    );
    expect(screen.queryByRole('button', { name: /follow/i })).not.toBeNull();
  });
});
