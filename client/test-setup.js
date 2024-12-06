import { afterEach, beforeAll, expect, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { testsData } from '@services';

expect.extend(matchers);

const mockUser = testsData.fullUser({
  userId: 48,
  numFollowing: 5,
  numFollowers: 5,
});

beforeAll(() => {
  vi.stubEnv('VITE_API_URL', null);
  HTMLDialogElement.prototype.show = vi.fn(function () {
    this.open = true;
  });
  HTMLDialogElement.prototype.showModal = vi.fn(function () {
    this.open = true;
  });
  HTMLDialogElement.prototype.close = vi.fn(function () {
    this.open = false;
  });

  vi.mock('react', async () => {
    const actual = await vi.importActual('react');
    return {
      ...actual,
      useContext: vi.fn(() => {
        return {
          user: mockUser,
          updateUser: () => {},
          updateInformation: () => {},
        };
      }),
    };
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
