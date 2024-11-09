/*import fs from "fs";
import pdfParse from "pdf-parse";

export async function extractTextFromPDF(dataBuffer: Buffer): Promise<string> {
    try {
        const data = await pdfParse(dataBuffer);
        return data.text; // Extracted text from PDF
    }
    catch (error) {
        console.error("Error in extracting text from PDF: ", error);
        throw error; // Better to throw the error than return empty string
    }
}
*/