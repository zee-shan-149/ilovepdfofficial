export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  iconColorClass: string;
  bgColorClass: string;
  actionButtonText?: string;
  acceptedFileTypes?: string;
  allowMultiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  popularity: number;
  weeklyUses?: number;
  steps?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

// Categories of PDF tools
export const categories: Category[] = [
  { id: 'convert', name: 'Convert PDF', icon: 'bi-arrow-left-right' },
  { id: 'optimize', name: 'Optimize PDF', icon: 'bi-speedometer' },
  { id: 'security', name: 'PDF Security', icon: 'bi-shield-lock' },
  { id: 'ai', name: 'AI Tools', icon: 'bi-robot' },
  { id: 'text', name: 'Text & Forms', icon: 'bi-file-text' },
  { id: 'misc', name: 'Miscellaneous', icon: 'bi-three-dots' }
];

// Sample tools data with 50+ tools
export const tools: Tool[] = [
  // Conversion Tools
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert PDF documents to editable Word files.',
    category: 'convert',
    icon: 'bi-file-earmark-word',
    iconColorClass: 'text-success',
    bgColorClass: 'bg-green-100',
    actionButtonText: 'Convert PDF',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 95,
    weeklyUses: 12877,
    steps: [
      { 
        title: 'Upload your PDF', 
        description: 'Click the upload button or drag and drop your PDF file into the upload area.' 
      },
      { 
        title: 'Wait for conversion', 
        description: 'Our system will convert your PDF to an editable Word document.' 
      },
      { 
        title: 'Download your Word file', 
        description: 'Once conversion is complete, download your editable DOCX file.' 
      }
    ],
    faqs: [
      {
        question: 'Will my PDF formatting be preserved?',
        answer: 'Our converter maintains most formatting including text, images, and basic layouts. Complex elements like forms may not convert perfectly.'
      },
      {
        question: 'How accurate is the conversion?',
        answer: 'Our PDF to Word conversion is highly accurate for text-based PDFs. Scanned documents may require OCR processing for best results.'
      },
      {
        question: 'Is there a file size limit?',
        answer: 'Yes, you can convert PDF files up to 50MB for free.'
      }
    ]
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Convert Word documents to PDF format.',
    category: 'convert',
    icon: 'bi-file-earmark-pdf',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    acceptedFileTypes: '.doc,.docx',
    allowMultiple: false,
    popularity: 89,
    weeklyUses: 9452
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Convert PDF pages to JPG images.',
    category: 'convert',
    icon: 'bi-file-earmark-image',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 82,
    weeklyUses: 7123
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert JPG images to PDF documents.',
    category: 'convert',
    icon: 'bi-file-earmark-pdf',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    acceptedFileTypes: '.jpg,.jpeg,.png',
    allowMultiple: true,
    maxFiles: 20,
    popularity: 86,
    weeklyUses: 9288
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel',
    description: 'Convert PDF tables to Excel spreadsheets.',
    category: 'convert',
    icon: 'bi-file-earmark-excel',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 78,
    weeklyUses: 5932
  },
  {
    id: 'excel-to-pdf',
    name: 'Excel to PDF',
    description: 'Convert Excel spreadsheets to PDF format.',
    category: 'convert',
    icon: 'bi-file-earmark-pdf',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    acceptedFileTypes: '.xls,.xlsx',
    allowMultiple: false,
    popularity: 76,
    weeklyUses: 4875
  },
  {
    id: 'pdf-to-pptx',
    name: 'PDF to PowerPoint',
    description: 'Convert PDF files to PowerPoint presentations.',
    category: 'convert',
    icon: 'bi-file-earmark-ppt',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 72,
    weeklyUses: 3654
  },
  {
    id: 'pptx-to-pdf',
    name: 'PowerPoint to PDF',
    description: 'Convert PowerPoint presentations to PDF format.',
    category: 'convert',
    icon: 'bi-file-earmark-pdf',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    acceptedFileTypes: '.ppt,.pptx',
    allowMultiple: false,
    popularity: 70,
    weeklyUses: 3421
  },
  {
    id: 'pdf-to-text',
    name: 'PDF to Text',
    description: 'Extract text content from PDF documents.',
    category: 'convert',
    icon: 'bi-file-earmark-text',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 65,
    weeklyUses: 2765
  },
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF',
    description: 'Convert HTML pages to PDF documents.',
    category: 'convert',
    icon: 'bi-file-earmark-code',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    acceptedFileTypes: '.html,.htm',
    allowMultiple: false,
    popularity: 62,
    weeklyUses: 2341
  },
  
  // Optimization Tools
  {
    id: 'compress-pdf',
    name: 'PDF Compressor',
    description: 'Reduce PDF file size while maintaining quality.',
    category: 'optimize',
    icon: 'bi-file-earmark-zip',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    actionButtonText: 'Compress PDF',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 92,
    weeklyUses: 10932,
    steps: [
      { 
        title: 'Upload your PDF', 
        description: 'Select a PDF file to compress or drag and drop it into the upload area.' 
      },
      { 
        title: 'Choose compression level', 
        description: 'Select the desired compression level - low, medium, or high.' 
      },
      { 
        title: 'Download compressed file', 
        description: 'Your compressed PDF will be ready to download in seconds.' 
      }
    ],
    faqs: [
      {
        question: 'How much can I reduce my PDF file size?',
        answer: 'Depending on the content of your PDF, our compressor can reduce file size by 40-80% while maintaining reasonable quality.'
      },
      {
        question: 'Will compression affect my PDF quality?',
        answer: 'Higher compression levels may reduce image quality. Text usually remains sharp, but photos and graphics may show compression artifacts at maximum compression.'
      },
      {
        question: 'Is there a file size limit for compression?',
        answer: 'Yes, you can compress PDF files up to 50MB for free.'
      }
    ]
  },
  {
    id: 'merge-pdf',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into a single document.',
    category: 'optimize',
    icon: 'bi-files',
    iconColorClass: 'text-secondary',
    bgColorClass: 'bg-purple-100',
    actionButtonText: 'Merge PDF Files',
    acceptedFileTypes: '.pdf',
    allowMultiple: true,
    maxFiles: 20,
    popularity: 94,
    weeklyUses: 15423,
    steps: [
      { 
        title: 'Upload your PDF files', 
        description: 'Click the upload button or drag and drop your PDF files into the designated area.' 
      },
      { 
        title: 'Arrange the order', 
        description: 'Reorder your PDFs by dragging them into the sequence you prefer or use the automatic sorting options.' 
      },
      { 
        title: 'Merge and download', 
        description: 'Click the "Merge PDF Files" button and then download your combined PDF document.' 
      }
    ],
    faqs: [
      {
        question: 'Is there a limit to how many PDF files I can merge?',
        answer: 'You can merge up to 20 PDF files at once with our free tool. Each file can be up to 50MB in size.'
      },
      {
        question: 'Is this service free to use?',
        answer: 'Yes, our PDF Merger tool is completely free to use without any limitations.'
      },
      {
        question: 'Is my data secure when using this tool?',
        answer: 'Yes, we take your privacy seriously. All files are processed in your browser and are not uploaded to our servers. Your documents are automatically deleted after processing.'
      }
    ]
  },
  {
    id: 'split-pdf',
    name: 'PDF Splitter',
    description: 'Split a PDF file into multiple files.',
    category: 'optimize',
    icon: 'bi-scissors',
    iconColorClass: 'text-secondary',
    bgColorClass: 'bg-purple-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 87,
    weeklyUses: 8791
  },
  {
    id: 'rotate-pdf',
    name: 'PDF Rotator',
    description: 'Rotate PDF pages to the correct orientation.',
    category: 'optimize',
    icon: 'bi-arrow-clockwise',
    iconColorClass: 'text-secondary',
    bgColorClass: 'bg-purple-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 75,
    weeklyUses: 4567
  },
  {
    id: 'crop-pdf',
    name: 'PDF Cropper',
    description: 'Crop PDF pages to remove unwanted margins.',
    category: 'optimize',
    icon: 'bi-crop',
    iconColorClass: 'text-secondary',
    bgColorClass: 'bg-purple-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 68,
    weeklyUses: 3245
  },
  {
    id: 'extract-pages',
    name: 'Page Extractor',
    description: 'Extract specific pages from a PDF document.',
    category: 'optimize',
    icon: 'bi-file-earmark-break',
    iconColorClass: 'text-secondary',
    bgColorClass: 'bg-purple-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 81,
    weeklyUses: 6789
  },
  {
    id: 'delete-pages',
    name: 'Page Deleter',
    description: 'Remove unwanted pages from a PDF document.',
    category: 'optimize',
    icon: 'bi-trash',
    iconColorClass: 'text-secondary',
    bgColorClass: 'bg-purple-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 77,
    weeklyUses: 5432
  },
  {
    id: 'repair-pdf',
    name: 'Repair PDF',
    description: 'Fix corrupted or damaged PDF files.',
    category: 'optimize',
    icon: 'bi-tools',
    iconColorClass: 'text-secondary',
    bgColorClass: 'bg-purple-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 73,
    weeklyUses: 3987
  },
  {
    id: 'optimize-pdf',
    name: 'Optimize PDF for Web',
    description: 'Optimize PDF files for faster web loading.',
    category: 'optimize',
    icon: 'bi-lightning-charge',
    iconColorClass: 'text-secondary',
    bgColorClass: 'bg-purple-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 79,
    weeklyUses: 5876
  },
  
  // Security Tools
  {
    id: 'password-protect-pdf',
    name: 'Password Protect PDF',
    description: 'Add password protection to your PDF files.',
    category: 'security',
    icon: 'bi-lock',
    iconColorClass: 'text-danger',
    bgColorClass: 'bg-red-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 88,
    weeklyUses: 8765
  },
  {
    id: 'unlock-pdf',
    name: 'Unlock PDF',
    description: 'Remove password protection from PDF files.',
    category: 'security',
    icon: 'bi-unlock',
    iconColorClass: 'text-danger',
    bgColorClass: 'bg-red-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 85,
    weeklyUses: 7654
  },
  {
    id: 'add-watermark',
    name: 'Add Watermark',
    description: 'Add text or image watermarks to PDF documents.',
    category: 'security',
    icon: 'bi-stamp',
    iconColorClass: 'text-danger',
    bgColorClass: 'bg-red-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 74,
    weeklyUses: 4321
  },
  {
    id: 'remove-watermark',
    name: 'Remove Watermark',
    description: 'Remove watermarks from PDF documents.',
    category: 'security',
    icon: 'bi-eraser',
    iconColorClass: 'text-danger',
    bgColorClass: 'bg-red-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 71,
    weeklyUses: 3654
  },
  {
    id: 'encrypt-pdf',
    name: 'Encrypt PDF',
    description: 'Encrypt your PDF files for enhanced security.',
    category: 'security',
    icon: 'bi-shield-lock',
    iconColorClass: 'text-danger',
    bgColorClass: 'bg-red-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 69,
    weeklyUses: 3421
  },
  
  // AI-Powered Tools
  {
    id: 'summarize-pdf',
    name: 'Summarize PDF',
    description: 'Extract key points from your PDF using AI.',
    category: 'ai',
    icon: 'bi-list-ul',
    iconColorClass: 'text-warning',
    bgColorClass: 'bg-amber-100',
    actionButtonText: 'Summarize',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 91,
    weeklyUses: 9876,
    steps: [
      { 
        title: 'Upload your PDF document', 
        description: 'Select the PDF you want to summarize.' 
      },
      { 
        title: 'Choose summary length', 
        description: 'Select brief, moderate, or detailed summary options.' 
      },
      { 
        title: 'Generate and review', 
        description: 'Our AI will generate a concise summary highlighting the key points from your document.' 
      }
    ],
    faqs: [
      {
        question: 'How does the AI summarization work?',
        answer: 'Our AI uses advanced natural language processing to understand the content of your PDF, identify the most important information, and create a concise summary that captures the key points.'
      },
      {
        question: 'What types of documents work best with this tool?',
        answer: 'The summarizer works best with text-heavy documents like articles, reports, research papers, and business documents. It may not be effective for PDFs that are primarily images or have complex tables.'
      },
      {
        question: 'How accurate are the summaries?',
        answer: 'Our AI summarizer produces highly accurate summaries for most documents, capturing the main points and key information. However, for very technical or specialized content, some nuance may be lost.'
      }
    ]
  },
  {
    id: 'rewrite-pdf',
    name: 'Rewrite PDF Text',
    description: 'Rewrite PDF content into different tones.',
    category: 'ai',
    icon: 'bi-pencil-square',
    iconColorClass: 'text-warning',
    bgColorClass: 'bg-amber-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 83,
    weeklyUses: 6543
  },
  {
    id: 'extract-keywords',
    name: 'Extract Keywords',
    description: 'Extract important keywords from PDF documents.',
    category: 'ai',
    icon: 'bi-tag',
    iconColorClass: 'text-warning',
    bgColorClass: 'bg-amber-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 78,
    weeklyUses: 5435
  },
  {
    id: 'chat-with-pdf',
    name: 'Chat with PDF',
    description: 'Ask questions about your PDF content using AI.',
    category: 'ai',
    icon: 'bi-chat-dots',
    iconColorClass: 'text-warning',
    bgColorClass: 'bg-amber-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 90,
    weeklyUses: 8765
  },
  {
    id: 'translate-pdf',
    name: 'Translate PDF',
    description: 'Translate PDF content to different languages.',
    category: 'ai',
    icon: 'bi-translate',
    iconColorClass: 'text-warning',
    bgColorClass: 'bg-amber-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 84,
    weeklyUses: 7123
  },
  
  // Text & Form Tools
  {
    id: 'create-fillable-form',
    name: 'Create Fillable Form',
    description: 'Create fillable PDF forms from existing documents.',
    category: 'text',
    icon: 'bi-input-cursor',
    iconColorClass: 'text-success',
    bgColorClass: 'bg-green-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 82,
    weeklyUses: 6543
  },
  {
    id: 'esign-pdf',
    name: 'E-Sign PDF',
    description: 'Electronically sign your PDF documents.',
    category: 'text',
    icon: 'bi-pen',
    iconColorClass: 'text-success',
    bgColorClass: 'bg-green-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 88,
    weeklyUses: 8234
  },
  {
    id: 'ocr-pdf',
    name: 'OCR PDF',
    description: 'Extract text from scanned PDFs using OCR.',
    category: 'text',
    icon: 'bi-file-earmark-text',
    iconColorClass: 'text-success',
    bgColorClass: 'bg-green-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 85,
    weeklyUses: 7654
  },
  {
    id: 'add-text',
    name: 'Add Text to PDF',
    description: 'Add text content to existing PDF documents.',
    category: 'text',
    icon: 'bi-type',
    iconColorClass: 'text-success',
    bgColorClass: 'bg-green-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 76,
    weeklyUses: 4567
  },
  {
    id: 'highlight-pdf',
    name: 'Highlight PDF Text',
    description: 'Add highlights to important text in PDF documents.',
    category: 'text',
    icon: 'bi-highlighter',
    iconColorClass: 'text-success',
    bgColorClass: 'bg-green-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 73,
    weeklyUses: 3456
  },
  
  // Miscellaneous Tools
  {
    id: 'images-to-pdf',
    name: 'Images to PDF',
    description: 'Create a PDF from multiple images.',
    category: 'misc',
    icon: 'bi-images',
    iconColorClass: 'text-info',
    bgColorClass: 'bg-cyan-100',
    acceptedFileTypes: '.jpg,.jpeg,.png,.gif',
    allowMultiple: true,
    maxFiles: 50,
    popularity: 87,
    weeklyUses: 8765
  },
  {
    id: 'screenshot-to-pdf',
    name: 'Screenshot to PDF',
    description: 'Convert screenshots to PDF documents.',
    category: 'misc',
    icon: 'bi-clipboard',
    iconColorClass: 'text-info',
    bgColorClass: 'bg-cyan-100',
    acceptedFileTypes: '.jpg,.jpeg,.png',
    allowMultiple: false,
    popularity: 70,
    weeklyUses: 3210
  },
  {
    id: 'scan-to-pdf',
    name: 'Scan to PDF',
    description: 'Convert scanned images to PDF documents.',
    category: 'misc',
    icon: 'bi-camera',
    iconColorClass: 'text-info',
    bgColorClass: 'bg-cyan-100',
    acceptedFileTypes: '.jpg,.jpeg,.png',
    allowMultiple: true,
    maxFiles: 10,
    popularity: 75,
    weeklyUses: 4876
  },
  {
    id: 'ebook-creator',
    name: 'E-book Creator',
    description: 'Create e-books in PDF format.',
    category: 'misc',
    icon: 'bi-book',
    iconColorClass: 'text-info',
    bgColorClass: 'bg-cyan-100',
    acceptedFileTypes: '.doc,.docx,.txt,.md',
    allowMultiple: false,
    popularity: 72,
    weeklyUses: 3543
  },
  {
    id: 'daily-planner',
    name: 'Daily Planner Creator',
    description: 'Create a daily planner in PDF format.',
    category: 'misc',
    icon: 'bi-calendar-check',
    iconColorClass: 'text-info',
    bgColorClass: 'bg-cyan-100',
    acceptedFileTypes: '*',
    allowMultiple: false,
    popularity: 68,
    weeklyUses: 2876
  },
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    description: 'Create professional resumes in PDF format.',
    category: 'misc',
    icon: 'bi-file-person',
    iconColorClass: 'text-info',
    bgColorClass: 'bg-cyan-100',
    acceptedFileTypes: '*',
    allowMultiple: false,
    popularity: 80,
    weeklyUses: 5432
  },
  {
    id: 'invoice-creator',
    name: 'Invoice Creator',
    description: 'Create professional invoices in PDF format.',
    category: 'misc',
    icon: 'bi-receipt',
    iconColorClass: 'text-info',
    bgColorClass: 'bg-cyan-100',
    acceptedFileTypes: '*',
    allowMultiple: false,
    popularity: 79,
    weeklyUses: 5678
  },
  
  // Add more tools as needed to reach 50+
  {
    id: 'compare-pdfs',
    name: 'Compare PDFs',
    description: 'Compare two PDF documents and highlight differences.',
    category: 'optimize',
    icon: 'bi-file-diff',
    iconColorClass: 'text-secondary',
    bgColorClass: 'bg-purple-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: true,
    maxFiles: 2,
    popularity: 76,
    weeklyUses: 4321
  },
  {
    id: 'number-pages',
    name: 'Number Pages',
    description: 'Add page numbers to PDF documents.',
    category: 'optimize',
    icon: 'bi-list-ol',
    iconColorClass: 'text-secondary',
    bgColorClass: 'bg-purple-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 72,
    weeklyUses: 3876
  },
  {
    id: 'pdf-to-html',
    name: 'PDF to HTML',
    description: 'Convert PDF documents to HTML format.',
    category: 'convert',
    icon: 'bi-filetype-html',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 67,
    weeklyUses: 2543
  },
  {
    id: 'annotate-pdf',
    name: 'Annotate PDF',
    description: 'Add annotations, notes, and comments to PDFs.',
    category: 'text',
    icon: 'bi-pencil',
    iconColorClass: 'text-success',
    bgColorClass: 'bg-green-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 78,
    weeklyUses: 5123
  },
  {
    id: 'pdf-metadata',
    name: 'Edit PDF Metadata',
    description: 'View and edit PDF document metadata.',
    category: 'optimize',
    icon: 'bi-info-circle',
    iconColorClass: 'text-secondary',
    bgColorClass: 'bg-purple-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 64,
    weeklyUses: 2134
  },
  {
    id: 'pdf-redact',
    name: 'PDF Redaction',
    description: 'Permanently remove sensitive information from PDFs.',
    category: 'security',
    icon: 'bi-eye-slash',
    iconColorClass: 'text-danger',
    bgColorClass: 'bg-red-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 75,
    weeklyUses: 4321
  },
  {
    id: 'pdf-to-markdown',
    name: 'PDF to Markdown',
    description: 'Convert PDF content to Markdown format.',
    category: 'convert',
    icon: 'bi-markdown',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 63,
    weeklyUses: 1987
  },
  {
    id: 'flatten-pdf',
    name: 'Flatten PDF',
    description: 'Flatten form fields and annotations in PDFs.',
    category: 'optimize',
    icon: 'bi-layers',
    iconColorClass: 'text-secondary',
    bgColorClass: 'bg-purple-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 62,
    weeklyUses: 1876
  },
  {
    id: 'pdf-to-pdfa',
    name: 'PDF to PDF/A',
    description: 'Convert PDF to archival PDF/A format.',
    category: 'convert',
    icon: 'bi-archive',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-100',
    acceptedFileTypes: '.pdf',
    allowMultiple: false,
    popularity: 65,
    weeklyUses: 2345
  },
  {
    id: 'certificate-creator',
    name: 'Certificate Creator',
    description: 'Create certificates in PDF format.',
    category: 'misc',
    icon: 'bi-award',
    iconColorClass: 'text-info',
    bgColorClass: 'bg-cyan-100',
    acceptedFileTypes: '*',
    allowMultiple: false,
    popularity: 71,
    weeklyUses: 3543
  }
];
