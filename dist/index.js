// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";

// server/proxy.ts
async function proxyDeepSeekRequest(req, res) {
  try {
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    console.log("DeepSeek API Key available:", !!DEEPSEEK_API_KEY);
    if (!DEEPSEEK_API_KEY) {
      console.error("DeepSeek API key is missing in environment variables");
      return res.status(500).json({
        error: "DeepSeek API key not configured on the server"
      });
    }
    console.log("DeepSeek Proxy Request Body:", JSON.stringify(req.body));
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: req.body.model || "deepseek-chat",
        messages: req.body.messages,
        temperature: req.body.temperature || 0.7,
        max_tokens: req.body.max_tokens || 1e3
      })
    });
    const data = await response.json();
    console.log("DeepSeek API Response:", JSON.stringify(data));
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Error proxying request to DeepSeek:", error);
    return res.status(500).json({
      error: "Failed to proxy request to DeepSeek API",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

// server/routes.ts
import express2 from "express";

// server/localPdfProcessor.ts
import { spawn } from "child_process";

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/localPdfProcessor.ts
async function processPdf(options) {
  return new Promise((resolve, reject) => {
    try {
      log(`Processing PDF with operation: ${options.operation}`, "pdf-processor");
      const pythonProcess = spawn("python3", ["server/pdfProcessor.py"]);
      let dataString = "";
      let errorString = "";
      pythonProcess.stdout.on("data", (data) => {
        dataString += data.toString();
      });
      pythonProcess.stderr.on("data", (data) => {
        errorString += data.toString();
        log(`Python process error: ${data.toString()}`, "pdf-processor");
      });
      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          log(`Python process exited with code ${code}`, "pdf-processor");
          log(`Error output: ${errorString}`, "pdf-processor");
          return reject(new Error(`Python process exited with code ${code}: ${errorString}`));
        }
        try {
          const result = JSON.parse(dataString);
          resolve(result);
        } catch (error) {
          log(`Error parsing JSON output: ${error}`, "pdf-processor");
          log(`Raw output: ${dataString}`, "pdf-processor");
          reject(new Error(`Failed to parse JSON output from Python script: ${error}`));
        }
      });
      pythonProcess.on("error", (error) => {
        log(`Python process error: ${error.message}`, "pdf-processor");
        reject(error);
      });
      pythonProcess.stdin.write(JSON.stringify(options));
      pythonProcess.stdin.end();
    } catch (error) {
      log(`Error running Python script: ${error}`, "pdf-processor");
      reject(error);
    }
  });
}
async function extractTextFromPdf(pdfBase64) {
  try {
    const result = await processPdf({
      operation: "extract_text",
      pdf_content: pdfBase64
    });
    if (!result.success) {
      throw new Error(result.error || "Failed to extract text from PDF");
    }
    return result.text;
  } catch (error) {
    log(`Error extracting text from PDF: ${error}`, "pdf-processor");
    throw error;
  }
}
async function compressPdf(pdfBase64, compressionLevel) {
  try {
    const result = await processPdf({
      operation: "compress_pdf",
      pdf_content: pdfBase64,
      compression_level: compressionLevel
    });
    if (!result.success) {
      throw new Error(result.error || "Failed to compress PDF");
    }
    return result.pdf;
  } catch (error) {
    log(`Error compressing PDF: ${error}`, "pdf-processor");
    throw error;
  }
}
async function pdfToDocx(pdfBase64) {
  try {
    const result = await processPdf({
      operation: "pdf_to_docx",
      pdf_content: pdfBase64
    });
    if (!result.success) {
      throw new Error(result.error || "Failed to convert PDF to DOCX");
    }
    return {
      docx: result.docx,
      filename: result.filename
    };
  } catch (error) {
    log(`Error converting PDF to DOCX: ${error}`, "pdf-processor");
    throw error;
  }
}
async function summarizeText(text, length) {
  try {
    const result = await processPdf({
      operation: "summarize",
      text,
      length
    });
    if (!result.success) {
      throw new Error(result.error || "Failed to summarize text");
    }
    return result.summary;
  } catch (error) {
    log(`Error summarizing text: ${error}`, "pdf-processor");
    throw error;
  }
}
async function extractKeywords(text, count = 10) {
  try {
    const result = await processPdf({
      operation: "extract_keywords",
      text,
      count
    });
    if (!result.success) {
      throw new Error(result.error || "Failed to extract keywords");
    }
    return result.keywords;
  } catch (error) {
    log(`Error extracting keywords: ${error}`, "pdf-processor");
    throw error;
  }
}
async function rewriteText(text, tone) {
  try {
    const result = await processPdf({
      operation: "rewrite",
      text,
      tone
    });
    if (!result.success) {
      throw new Error(result.error || "Failed to rewrite text");
    }
    return result.rewritten_text;
  } catch (error) {
    log(`Error rewriting text: ${error}`, "pdf-processor");
    throw error;
  }
}
async function chatWithPdf(text, question) {
  try {
    const result = await processPdf({
      operation: "chat",
      text,
      question
    });
    if (!result.success) {
      throw new Error(result.error || "Failed to process chat question");
    }
    return result.answer;
  } catch (error) {
    log(`Error chatting with PDF: ${error}`, "pdf-processor");
    throw error;
  }
}
async function translateText(text, targetLanguage) {
  try {
    const result = await processPdf({
      operation: "translate",
      text,
      target_language: targetLanguage
    });
    if (!result.success) {
      throw new Error(result.error || "Failed to translate text");
    }
    return result.translated_text;
  } catch (error) {
    log(`Error translating text: ${error}`, "pdf-processor");
    throw error;
  }
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.use(express2.json({ limit: "20mb" }));
  app2.post("/api/deepseek/chat", proxyDeepSeekRequest);
  app2.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app2.post("/api/pdf/extract-text", async (req, res) => {
    try {
      const { pdfBase64 } = req.body;
      if (!pdfBase64) {
        return res.status(400).json({ error: "PDF content is required" });
      }
      const text = await extractTextFromPdf(pdfBase64);
      res.json({ text });
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      res.status(500).json({
        error: "Failed to extract text from PDF",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/pdf/compress", async (req, res) => {
    try {
      const { pdfBase64, compressionLevel } = req.body;
      if (!pdfBase64) {
        return res.status(400).json({ error: "PDF content is required" });
      }
      const compressedPdf = await compressPdf(
        pdfBase64,
        compressionLevel || "medium"
      );
      res.json({ pdf: compressedPdf });
    } catch (error) {
      console.error("Error compressing PDF:", error);
      res.status(500).json({
        error: "Failed to compress PDF",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/pdf/to-docx", async (req, res) => {
    try {
      const { pdfBase64 } = req.body;
      if (!pdfBase64) {
        return res.status(400).json({ error: "PDF content is required" });
      }
      const result = await pdfToDocx(pdfBase64);
      res.json(result);
    } catch (error) {
      console.error("Error converting PDF to DOCX:", error);
      res.status(500).json({
        error: "Failed to convert PDF to DOCX",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/pdf/summarize", async (req, res) => {
    try {
      const { text, length } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text content is required" });
      }
      const summary = await summarizeText(
        text,
        length || "moderate"
      );
      res.json({ summary });
    } catch (error) {
      console.error("Error summarizing text:", error);
      res.status(500).json({
        error: "Failed to summarize text",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/pdf/extract-keywords", async (req, res) => {
    try {
      const { text, count } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text content is required" });
      }
      const keywords = await extractKeywords(text, count || 10);
      res.json({ keywords });
    } catch (error) {
      console.error("Error extracting keywords:", error);
      res.status(500).json({
        error: "Failed to extract keywords",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/pdf/rewrite", async (req, res) => {
    try {
      const { text, tone } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text content is required" });
      }
      const rewrittenText = await rewriteText(
        text,
        tone || "formal"
      );
      res.json({ text: rewrittenText });
    } catch (error) {
      console.error("Error rewriting text:", error);
      res.status(500).json({
        error: "Failed to rewrite text",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/pdf/chat", async (req, res) => {
    try {
      const { text, question } = req.body;
      if (!text || !question) {
        return res.status(400).json({
          error: "Both PDF text content and question are required"
        });
      }
      const answer = await chatWithPdf(text, question);
      res.json({ answer });
    } catch (error) {
      console.error("Error chatting with PDF:", error);
      res.status(500).json({
        error: "Failed to process chat question",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/pdf/translate", async (req, res) => {
    try {
      const { text, targetLanguage } = req.body;
      if (!text || !targetLanguage) {
        return res.status(400).json({
          error: "Both text content and target language are required"
        });
      }
      const translatedText = await translateText(text, targetLanguage);
      res.json({ text: translatedText });
    } catch (error) {
      console.error("Error translating text:", error);
      res.status(500).json({
        error: "Failed to translate text",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/index.ts
console.log("DeepSeek API Key available in server:", !!process.env.DEEPSEEK_API_KEY);
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
