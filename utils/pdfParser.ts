import fs from "fs";
import pdfParse from "pdf-parse";

export async function extractTextFromPDF(filePath: string): Promise<string> {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text; // Extracted text from PDF
    }
    catch (error) {
        console.error("Error in extracting text from PDF: ", error);
        throw error;
    }
}