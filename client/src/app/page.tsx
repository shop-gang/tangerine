"use client";

import { useState } from "react";
import { createDraft } from "../services/api";
import { generatePDF } from "../services/pdf";
import { ErrorBoundary } from "../components/ErrorBoundary";
import type { EbookDraft } from "../../../shared/types";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<EbookDraft | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!prompt.trim()) {
        throw new Error("Please enter a prompt");
      }
      const response = await createDraft(prompt);
      setDraft(response.draft);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Failed to create draft");
      setDraft(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    if (!draft) return;

    setIsExporting(true);
    try {
      const pdfBlob = await generatePDF(draft);
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${draft.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting PDF:", err);
      setError(err instanceof Error ? err.message : "Failed to export PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-center">AetherPress</h1>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="prompt" className="text-lg font-medium">
                Your Book Idea
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Describe your eBook idea, including genre, tone, and any specific elements you want..."
                className="w-full h-32 p-4 border rounded-lg shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              />
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  {/* Heroicons: https://heroicons.com/ (MIT) - Using basic spinner pattern */}
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create eBook Draft"
              )}
            </button>
          </form>

          <div className="w-full mt-8">
            {isLoading ? (
              <div className="p-6 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-center">
                  Creating your draft...
                </p>
              </div>
            ) : draft ? (
              <div className="p-6 border rounded-lg bg-white shadow-sm space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{draft.title}</h2>
                    <p className="text-gray-600">By {draft.author}</p>
                  </div>
                  <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isExporting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Exporting...
                      </span>
                    ) : (
                      "Export as PDF"
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  {draft.sections.map((section, index) => (
                    <section key={index} className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        {section.heading}
                      </h3>
                      {section.imageUrl && (
                        <img
                          src={section.imageUrl}
                          alt={section.heading}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                      <p className="text-gray-700 leading-relaxed">
                        {section.content}
                      </p>
                    </section>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-center">
                  Preview will appear here after submission
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}
