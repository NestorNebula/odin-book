import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileForm from './ProfileForm';
import { testsData } from '@services';

const profile = testsData.profile({});
const mockSubmit = vi.fn();
beforeEach(() =>
  render(
    <ProfileForm
      profile={profile}
      onSubmit={mockSubmit}
      backgroundFile={{}}
      avatarFile={{}}
    />
  )
);

describe('ProfileForm', () => {
  it('renders form with existing values', () => {
    expect(screen.queryByText(profile.displayName)).not.toBeNull();
    expect(screen.queryByText(profile.bio)).not.toBeNull();
    expect(screen.queryByText(profile.location)).not.toBeNull();
    expect(screen.queryByText(profile.website)).not.toBeNull();
  });

  it('calls submit only when values are correct', async () => {
    const user = userEvent.setup();
    const nameInput = screen.getByLabelText(/name/i);
    await user.clear(nameInput);
    const submitBtn = screen.getByRole('button', { name: /save/i });
    await user.click(submitBtn);
    expect(mockSubmit).not.toHaveBeenCalled();
    await user.type(nameInput, 'Name');
    await user.click(submitBtn);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
