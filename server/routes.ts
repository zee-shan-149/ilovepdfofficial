import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { proxyDeepSeekRequest } from "./proxy";
import express from "express";
import * as localPdfProcessor from "./localPdfProcessor";

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable JSON body parsing with a larger limit for document processing
  app.use(express.json({ limit: '20mb' }));
  
  // DeepSeek API proxy route (kept for compatibility)
  app.post('/api/deepseek/chat', proxyDeepSeekRequest);

  // Example health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Local PDF processing routes
  app.post('/api/pdf/extract-text', async (req: Request, res: Response) => {
    try {
      const { pdfBase64 } = req.body;
      
      if (!pdfBase64) {
        return res.status(400).json({ error: 'PDF content is required' });
      }
      
      const text = await localPdfProcessor.extractTextFromPdf(pdfBase64);
      res.json({ text });
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      res.status(500).json({ 
        error: 'Failed to extract text from PDF',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post('/api/pdf/compress', async (req: Request, res: Response) => {
    try {
      const { pdfBase64, compressionLevel } = req.body;
      
      if (!pdfBase64) {
        return res.status(400).json({ error: 'PDF content is required' });
      }
      
      const compressedPdf = await localPdfProcessor.compressPdf(
        pdfBase64, 
        compressionLevel || 'medium'
      );
      
      res.json({ pdf: compressedPdf });
    } catch (error) {
      console.error('Error compressing PDF:', error);
      res.status(500).json({ 
        error: 'Failed to compress PDF',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post('/api/pdf/to-docx', async (req: Request, res: Response) => {
    try {
      const { pdfBase64 } = req.body;
      
      if (!pdfBase64) {
        return res.status(400).json({ error: 'PDF content is required' });
      }
      
      const result = await localPdfProcessor.pdfToDocx(pdfBase64);
      res.json(result);
    } catch (error) {
      console.error('Error converting PDF to DOCX:', error);
      res.status(500).json({ 
        error: 'Failed to convert PDF to DOCX',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post('/api/pdf/summarize', async (req: Request, res: Response) => {
    try {
      const { text, length } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: 'Text content is required' });
      }
      
      const summary = await localPdfProcessor.summarizeText(
        text, 
        length || 'moderate'
      );
      
      res.json({ summary });
    } catch (error) {
      console.error('Error summarizing text:', error);
      res.status(500).json({ 
        error: 'Failed to summarize text',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post('/api/pdf/extract-keywords', async (req: Request, res: Response) => {
    try {
      const { text, count } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: 'Text content is required' });
      }
      
      const keywords = await localPdfProcessor.extractKeywords(text, count || 10);
      res.json({ keywords });
    } catch (error) {
      console.error('Error extracting keywords:', error);
      res.status(500).json({ 
        error: 'Failed to extract keywords',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post('/api/pdf/rewrite', async (req: Request, res: Response) => {
    try {
      const { text, tone } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: 'Text content is required' });
      }
      
      const rewrittenText = await localPdfProcessor.rewriteText(
        text, 
        tone || 'formal'
      );
      
      res.json({ text: rewrittenText });
    } catch (error) {
      console.error('Error rewriting text:', error);
      res.status(500).json({ 
        error: 'Failed to rewrite text',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post('/api/pdf/chat', async (req: Request, res: Response) => {
    try {
      const { text, question } = req.body;
      
      if (!text || !question) {
        return res.status(400).json({ 
          error: 'Both PDF text content and question are required' 
        });
      }
      
      const answer = await localPdfProcessor.chatWithPdf(text, question);
      res.json({ answer });
    } catch (error) {
      console.error('Error chatting with PDF:', error);
      res.status(500).json({ 
        error: 'Failed to process chat question',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post('/api/pdf/translate', async (req: Request, res: Response) => {
    try {
      const { text, targetLanguage } = req.body;
      
      if (!text || !targetLanguage) {
        return res.status(400).json({ 
          error: 'Both text content and target language are required' 
        });
      }
      
      const translatedText = await localPdfProcessor.translateText(text, targetLanguage);
      res.json({ text: translatedText });
    } catch (error) {
      console.error('Error translating text:', error);
      res.status(500).json({ 
        error: 'Failed to translate text',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
