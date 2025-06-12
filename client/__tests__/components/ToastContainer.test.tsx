import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "../../src/components/ToastContainer";

describe("ToastContainer", () => {
  beforeEach(() => {
    // Create a div for the portal
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "portal-root");
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    // Clean up the portal div
    const portalRoot = document.getElementById("portal-root");
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
    // Clean up window.toast
    delete window.toast;
  });

  it("renders toast messages", () => {
    render(<ToastContainer />);

    // Show a toast message
    act(() => {
      window.toast?.error("Test error message");
    });

    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("removes toast message after duration", async () => {
    jest.useFakeTimers();
    render(<ToastContainer />);

    // Show a toast message
    act(() => {
      window.toast?.info("Test info message");
    });

    expect(screen.getByText("Test info message")).toBeInTheDocument();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(screen.queryByText("Test info message")).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it("allows manual dismissal of toast", async () => {
    render(<ToastContainer />);

    // Show a toast message
    act(() => {
      window.toast?.warning("Test warning message");
    });

    const closeButton = screen.getByLabelText("Close");
    await act(async () => {
      await userEvent.click(closeButton);
    });

    await act(async () => {
      await waitFor(() => {
        expect(
          screen.queryByText("Test warning message")
        ).not.toBeInTheDocument();
      });
    });
  });

  it("supports different toast types", () => {
    render(<ToastContainer />);

    // Show different types of toasts
    act(() => {
      window.toast?.success("Success message");
      window.toast?.error("Error message");
      window.toast?.warning("Warning message");
      window.toast?.info("Info message");
    });

    expect(screen.getByText("Success message")).toBeInTheDocument();
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.getByText("Warning message")).toBeInTheDocument();
    expect(screen.getByText("Info message")).toBeInTheDocument();
  });
});
