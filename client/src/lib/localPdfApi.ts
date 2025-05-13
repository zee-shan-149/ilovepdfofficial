/**
 * Local PDF API Client
 * 
 * This file provides client-side functions to interact with the local PDF processing
 * API endpoints. These replace the DeepSeek API functions for PDF processing.
 */

// No imports needed, using fetch API directly

/**
 * Convert a File object to base64 string
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Extract the base64 part from the data URL
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
}

/**
 * Summarizes text content with specified length
 */
export async function summarizeText(
  text: string, 
  length: 'brief' | 'moderate' | 'detailed'
): Promise<string> {
  try {
    console.log(`Summarizing text with length: ${length}, text length: ${text.length} chars`);
    
    const response = await fetch('/api/pdf/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, length })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error summarizing text:', data);
      throw new Error(data.error || 'Failed to summarize text');
    }
    
    return data.summary || '';
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw error;
  }
}

/**
 * Extracts keywords from text content
 */
export async function extractKeywords(text: string, count: number = 10): Promise<string[]> {
  try {
    console.log(`Extracting ${count} keywords from text of length: ${text.length} chars`);
    
    const response = await fetch('/api/pdf/extract-keywords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, count })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error extracting keywords:', data);
      throw new Error(data.error || 'Failed to extract keywords');
    }
    
    return data.keywords || [];
  } catch (error) {
    console.error('Error extracting keywords:', error);
    throw error;
  }
}

/**
 * Rewrites text content in a different tone
 */
export async function rewriteText(
  text: string, 
  tone: 'formal' | 'casual' | 'simple' | 'technical'
): Promise<string> {
  try {
    console.log(`Rewriting text with tone: ${tone}, text length: ${text.length} chars`);
    
    const response = await fetch('/api/pdf/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, tone })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error rewriting text:', data);
      throw new Error(data.error || 'Failed to rewrite text');
    }
    
    return data.text || '';
  } catch (error) {
    console.error('Error rewriting text:', error);
    throw error;
  }
}

/**
 * Chat with a PDF (answer questions based on PDF content)
 */
export async function chatWithPdf(pdfText: string, question: string): Promise<string> {
  try {
    console.log(`Asking question about PDF, text length: ${pdfText.length} chars, question: ${question}`);
    
    const response = await fetch('/api/pdf/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: pdfText, question })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error chatting with PDF:', data);
      throw new Error(data.error || 'Failed to process chat question');
    }
    
    return data.answer || '';
  } catch (error) {
    console.error('Error chatting with PDF:', error);
    throw error;
  }
}

/**
 * Translates PDF content to another language
 */
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    console.log(`Translating text to ${targetLanguage}, text length: ${text.length} chars`);
    
    const response = await fetch('/api/pdf/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLanguage })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error translating text:', data);
      throw new Error(data.error || 'Failed to translate text');
    }
    
    return data.text || '';
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
}

/**
 * Extract text from a PDF file
 */
export async function extractTextFromPdf(pdfFile: File): Promise<string> {
  try {
    console.log(`Extracting text from PDF: ${pdfFile.name}, size: ${pdfFile.size} bytes`);
    
    // Convert the PDF file to base64
    const pdfBase64 = await fileToBase64(pdfFile);
    
    const response = await fetch('/api/pdf/extract-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pdfBase64 })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error extracting text from PDF:', data);
      throw new Error(data.error || 'Failed to extract text from PDF');
    }
    
    return data.text || '';
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
}

/**
 * Convert a PDF to a Word document
 */
export async function pdfToDocx(pdfFile: File): Promise<{ docx: string, filename: string }> {
  try {
    console.log(`Converting PDF to Word: ${pdfFile.name}, size: ${pdfFile.size} bytes`);
    
    // Convert the PDF file to base64
    const pdfBase64 = await fileToBase64(pdfFile);
    
    const response = await fetch('/api/pdf/to-docx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pdfBase64 })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error converting PDF to Word:', data);
      throw new Error(data.error || 'Failed to convert PDF to Word');
    }
    
    return {
      docx: data.docx || '',
      filename: data.filename || 'converted_document.docx'
    };
  } catch (error) {
    console.error('Error converting PDF to Word:', error);
    throw error;
  }
}