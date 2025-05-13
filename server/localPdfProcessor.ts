/**
 * Local PDF Processor Module
 * 
 * This module provides a TypeScript wrapper around the Python PDF processing script.
 * It runs the Python script as a child process and communicates with it via stdin/stdout.
 */

import { spawn } from 'child_process';
import { log } from './vite';

interface ProcessPdfOptions {
  operation: string;
  [key: string]: any;
}

/**
 * Process a PDF file using the local Python script
 */
export async function processPdf(options: ProcessPdfOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      log(`Processing PDF with operation: ${options.operation}`, 'pdf-processor');
      
      // Spawn the Python process
      const pythonProcess = spawn('python3', ['server/pdfProcessor.py']);
      
      let dataString = '';
      let errorString = '';
      
      // Collect data from stdout
      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });
      
      // Collect errors from stderr
      pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
        log(`Python process error: ${data.toString()}`, 'pdf-processor');
      });
      
      // Handle process completion
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          log(`Python process exited with code ${code}`, 'pdf-processor');
          log(`Error output: ${errorString}`, 'pdf-processor');
          return reject(new Error(`Python process exited with code ${code}: ${errorString}`));
        }
        
        try {
          // Parse the JSON output from the Python script
          const result = JSON.parse(dataString);
          resolve(result);
        } catch (error) {
          log(`Error parsing JSON output: ${error}`, 'pdf-processor');
          log(`Raw output: ${dataString}`, 'pdf-processor');
          reject(new Error(`Failed to parse JSON output from Python script: ${error}`));
        }
      });
      
      // Handle process errors
      pythonProcess.on('error', (error) => {
        log(`Python process error: ${error.message}`, 'pdf-processor');
        reject(error);
      });
      
      // Send the input data to the Python script
      pythonProcess.stdin.write(JSON.stringify(options));
      pythonProcess.stdin.end();
      
    } catch (error) {
      log(`Error running Python script: ${error}`, 'pdf-processor');
      reject(error);
    }
  });
}

/**
 * Extract text from a PDF file
 */
export async function extractTextFromPdf(pdfBase64: string): Promise<string> {
  try {
    const result = await processPdf({
      operation: 'extract_text',
      pdf_content: pdfBase64
    });
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to extract text from PDF');
    }
    
    return result.text;
  } catch (error) {
    log(`Error extracting text from PDF: ${error}`, 'pdf-processor');
    throw error;
  }
}

/**
 * Compress a PDF file
 */
export async function compressPdf(pdfBase64: string, compressionLevel: 'low' | 'medium' | 'high'): Promise<string> {
  try {
    const result = await processPdf({
      operation: 'compress_pdf',
      pdf_content: pdfBase64,
      compression_level: compressionLevel
    });
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to compress PDF');
    }
    
    return result.pdf;
  } catch (error) {
    log(`Error compressing PDF: ${error}`, 'pdf-processor');
    throw error;
  }
}

/**
 * Convert a PDF to a Word document
 */
export async function pdfToDocx(pdfBase64: string): Promise<{ docx: string, filename: string }> {
  try {
    const result = await processPdf({
      operation: 'pdf_to_docx',
      pdf_content: pdfBase64
    });
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to convert PDF to DOCX');
    }
    
    return {
      docx: result.docx,
      filename: result.filename
    };
  } catch (error) {
    log(`Error converting PDF to DOCX: ${error}`, 'pdf-processor');
    throw error;
  }
}

/**
 * Summarize text
 */
export async function summarizeText(text: string, length: 'brief' | 'moderate' | 'detailed'): Promise<string> {
  try {
    const result = await processPdf({
      operation: 'summarize',
      text: text,
      length: length
    });
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to summarize text');
    }
    
    return result.summary;
  } catch (error) {
    log(`Error summarizing text: ${error}`, 'pdf-processor');
    throw error;
  }
}

/**
 * Extract keywords from text
 */
export async function extractKeywords(text: string, count: number = 10): Promise<string[]> {
  try {
    const result = await processPdf({
      operation: 'extract_keywords',
      text: text,
      count: count
    });
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to extract keywords');
    }
    
    return result.keywords;
  } catch (error) {
    log(`Error extracting keywords: ${error}`, 'pdf-processor');
    throw error;
  }
}

/**
 * Rewrite text with a different tone
 */
export async function rewriteText(text: string, tone: 'formal' | 'casual' | 'simple' | 'technical'): Promise<string> {
  try {
    const result = await processPdf({
      operation: 'rewrite',
      text: text,
      tone: tone
    });
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to rewrite text');
    }
    
    return result.rewritten_text;
  } catch (error) {
    log(`Error rewriting text: ${error}`, 'pdf-processor');
    throw error;
  }
}

/**
 * Chat with a PDF (answer questions based on PDF content)
 */
export async function chatWithPdf(text: string, question: string): Promise<string> {
  try {
    const result = await processPdf({
      operation: 'chat',
      text: text,
      question: question
    });
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to process chat question');
    }
    
    return result.answer;
  } catch (error) {
    log(`Error chatting with PDF: ${error}`, 'pdf-processor');
    throw error;
  }
}

/**
 * Translate text to another language
 */
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    const result = await processPdf({
      operation: 'translate',
      text: text,
      target_language: targetLanguage
    });
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to translate text');
    }
    
    return result.translated_text;
  } catch (error) {
    log(`Error translating text: ${error}`, 'pdf-processor');
    throw error;
  }
}