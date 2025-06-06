/**
 * Error Boundary specifically for PDF export functionality
 *
 * This component provides error handling for PDF generation and export operations.
 * It catches errors that occur during PDF generation and displays a user-friendly
 * error message with a retry option.
 *
 * Features:
 * - Catches PDF generation errors
 * - Shows specific error messages for PDF-related failures
 * - Provides retry functionality
 * - Tracks retry state to prevent rapid retries
 *
 * Usage:
 * ```tsx
 * <PdfExportBoundary>
 *   <ExportButton onClick={handleExport} />
 * </PdfExportBoundary>
 * ```
 */

import { Component, ReactNode } from "react";
import { PdfGenerationError } from "../services/pdf";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  isRetrying: boolean;
}

export class PdfExportBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, isRetrying: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, isRetrying: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to an error reporting service
    console.error("PDF Export error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, isRetrying: true });
    // The retry will happen automatically when we re-render the children
    setTimeout(() => {
      this.setState({ isRetrying: false });
    }, 100);
  };

  render(): ReactNode {
    if (this.state.hasError) {
      const isPdfError = this.state.error instanceof PdfGenerationError;
      return (
        <div className="p-6 border rounded-lg bg-red-50 space-y-4">
          <h2 className="text-xl font-semibold text-red-700">
            {isPdfError ? "PDF Generation Failed" : "Export Error"}
          </h2>
          <p className="text-red-600">
            {this.state.error?.message || "Failed to export your book."}
          </p>
          <div className="flex gap-4">
            <button
              onClick={this.handleRetry}
              disabled={this.state.isRetrying}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {this.state.isRetrying ? "Retrying..." : "Try again"}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
