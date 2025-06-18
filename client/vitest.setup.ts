import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock next/router
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    query: {},
  }),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));
