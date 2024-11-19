import { afterEach, beforeAll, expect, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

beforeAll(() => {
  vi.stubEnv('VITE_API_URL', null);
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
