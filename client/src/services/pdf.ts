// client/src/services/pdf.ts
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { EbookDraft } from "../../../shared/types";

export async function generatePDF(draft: EbookDraft): Promise<Blob> {
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

    // Draw heading
    page.drawText(section.heading, {
      x: 50,
      y: height - 50,
      size: 20,
      font: timesBold,
      color: rgb(0, 0, 0),
    });

    // Draw content (basic implementation - will need word wrapping)
    page.drawText(section.content, {
      x: 50,
      y: height - 100,
      size: 12,
      font: timesRoman,
      color: rgb(0, 0, 0),
    });

    // TODO: Implement image downloading and embedding
    // For now, we'll add a placeholder note about images
    if (section.imageUrl) {
      page.drawText("[ Image will be added here ]", {
        x: 50,
        y: height - 300,
        size: 10,
        font: timesRoman,
        color: rgb(0.5, 0.5, 0.5),
      });
    }
  }

  // Save and return as Blob
  const pdfBytes = await pdfDoc.save();
  // Convert Uint8Array to ArrayBuffer before creating Blob
  return new Blob([new Uint8Array(pdfBytes).buffer], {
    type: "application/pdf",
  });
}
