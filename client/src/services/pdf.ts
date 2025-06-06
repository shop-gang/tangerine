/**
 * PDF Generation Service for AetherPress
 * This service handles the generation of PDF documents from ebook drafts.
 * It uses pdf-lib for PDF generation and includes:
 * - Custom error handling with PdfGenerationError
 * - Automatic retries with exponential backoff
 * - Basic word-wrapping for text content
 * - Font embedding
 * - Image placeholder support
 */

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { EbookDraft } from "../../../shared/types";
import { withRetry } from "../utils/retry";

/**
 * Custom error class for PDF generation failures.
 * Used to distinguish PDF-specific errors from other errors
 * and provide more descriptive error messages.
 */
export class PdfGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PdfGenerationError";
  }
}

/**
 * Generates a PDF document from an ebook draft.
 *
 * Features:
 * - Title page with book title and author
 * - Section pages with headings and content
 * - Basic word wrapping for text
 * - Image placeholders for future image support
 * - Automatic retries on failure
 *
 * @param draft - The ebook draft to convert to PDF
 * @returns A Promise that resolves to a Blob containing the PDF
 * @throws PdfGenerationError if PDF generation fails
 */
export async function generatePDF(draft: EbookDraft): Promise<Blob> {
  return withRetry(
    async () => {
      try {
        // Create the PDF document
        const pdfDoc = await PDFDocument.create();

        // Embed fonts
        const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

        // Title page
        const titlePage = pdfDoc.addPage();
        const { height } = titlePage.getSize();

        // Add title
        titlePage.drawText(draft.title, {
          x: 50,
          y: height - 150,
          size: 28,
          font: timesBold,
          color: rgb(0, 0, 0),
        });

        // Add author
        titlePage.drawText(`By ${draft.author}`, {
          x: 50,
          y: height - 200,
          size: 16,
          font: timesRoman,
          color: rgb(0, 0, 0),
        });

        // Content pages
        for (const section of draft.sections) {
          const page = pdfDoc.addPage();

          try {
            // Draw heading
            page.drawText(section.heading, {
              x: 50,
              y: height - 50,
              size: 20,
              font: timesBold,
              color: rgb(0, 0, 0),
            });

            // Draw content with basic word wrapping
            const words = section.content.split(" ");
            let currentLine = "";
            let yPosition = height - 100;
            const maxWidth = 500; // page width minus margins

            for (const word of words) {
              const testLine = currentLine + (currentLine ? " " : "") + word;
              // Use a simpler width calculation since pdf-lib doesn't provide easy text metrics
              const approximateWidth = testLine.length * 7; // Rough estimate for 12pt font

              if (approximateWidth > maxWidth) {
                page.drawText(currentLine, {
                  x: 50,
                  y: yPosition,
                  size: 12,
                  font: timesRoman,
                  color: rgb(0, 0, 0),
                });
                currentLine = word;
                yPosition -= 20; // Line spacing
              } else {
                currentLine = testLine;
              }
            }

            // Draw remaining text
            if (currentLine) {
              page.drawText(currentLine, {
                x: 50,
                y: yPosition,
                size: 12,
                font: timesRoman,
                color: rgb(0, 0, 0),
              });
            }

            // Handle image placeholders
            if (section.imageUrl) {
              page.drawText("[ Image will be added here ]", {
                x: 50,
                y: Math.max(yPosition - 100, 50), // Ensure we don't go off the page
                size: 10,
                font: timesRoman,
                color: rgb(0.5, 0.5, 0.5),
              });
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : "Unknown error";
            throw new PdfGenerationError(
              `Failed to generate section "${section.heading}": ${errorMessage}`
            );
          }
        }

        // Save and return as Blob
        const pdfBytes = await pdfDoc.save();
        return new Blob([new Uint8Array(pdfBytes).buffer], {
          type: "application/pdf",
        });
      } catch (error) {
        if (error instanceof PdfGenerationError) {
          throw error;
        }
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        throw new PdfGenerationError(`Failed to generate PDF: ${errorMessage}`);
      }
    },
    { maxAttempts: 2, delayMs: 500 } // Shorter retry for PDF generation since it's client-side
  );
}
