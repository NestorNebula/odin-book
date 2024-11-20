import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(
      <Input
        value={'null'}
        validation={{ isValid: true, message: '', maxLength: '50' }}
        updateValue={() => {}}
        name={'value'}
      />
    );
    expect(screen.queryByLabelText(/value/i)).not.toBeNull();
    expect(screen.queryByText(/4\/50/)).not.toBeNull();
  });

  it('renders error message when message is provided', () => {
    render(
      <Input
        value={'null'}
        validation={{ isValid: false, message: 'not null', maxLength: '50' }}
        updateValue={() => {}}
        name={'value'}
      />
    );
    expect(screen.queryByText(/not null/i)).not.toBeNull();
  });
});
