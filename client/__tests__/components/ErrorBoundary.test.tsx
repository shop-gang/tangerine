import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../src/components/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    const consoleError = console.error;
    console.error = jest.fn(); // Suppress console.error for this test

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    console.error = consoleError; // Restore console.error
  });
});
