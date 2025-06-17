import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: Array<string | number | boolean | null | undefined>;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Store error info for UI display
    this.setState({ errorInfo });

    // Report error to an error reporting service
    this.props.onError?.(error, errorInfo);

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error);
      console.error("Component stack:", errorInfo.componentStack);
    }
  }

  componentDidUpdate(prevProps: Props): void {
    // Reset error state if resetKeys change
    if (
      this.props.resetKeys &&
      prevProps.resetKeys &&
      this.state.hasError &&
      this.didResetKeysChange(prevProps.resetKeys, this.props.resetKeys)
    ) {
      this.resetErrorBoundary();
    }
  }

  private didResetKeysChange(
    prevKeys: Array<string | number | boolean | null | undefined>,
    currentKeys: Array<string | number | boolean | null | undefined>
  ): boolean {
    return (
      prevKeys.length !== currentKeys.length ||
      prevKeys.some((key, idx) => !Object.is(key, currentKeys[idx]))
    );
  }

  private resetErrorBoundary = (): void => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className="p-6 max-w-lg mx-auto my-8 border rounded-lg bg-red-50 space-y-4"
            role="alert"
          >
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-red-700">
                Something went wrong
              </h2>
            </div>

            <div className="text-red-600 space-y-2">
              <p className="font-medium">
                {this.state.error?.message || "An unexpected error occurred."}
              </p>
              {process.env.NODE_ENV === "development" &&
                this.state.errorInfo && (
                  <pre className="mt-2 p-4 bg-red-100 rounded text-sm overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={this.resetErrorBoundary}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Try again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Reload page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
