import { useState } from 'react';
import { FileProcessor } from '@/lib/fileProcessor';
import FileUploader from './FileUploader';

export default function RewritePdfTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tone, setTone] = useState<'formal' | 'casual' | 'simple' | 'technical'>('formal');
  const [rewrittenText, setRewrittenText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setRewrittenText('');
      setError(null);
    }
  };

  const handleRewriteContent = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await FileProcessor.rewritePdfContent(selectedFile, tone);
      setRewrittenText(result);
    } catch (err) {
      console.error("Error rewriting PDF content:", err);
      setError("An error occurred while rewriting the document. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadText = async () => {
    if (!rewrittenText || !selectedFile) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // Generate a filename based on the original PDF filename
      const baseFilename = selectedFile.name.replace(/\.[^/.]+$/, ""); // Remove extension
      const downloadFilename = `${baseFilename}_${tone}.txt`;
      
      // Use our enhanced download method that returns a promise
      const downloadSuccess = await FileProcessor.downloadTextAsFile(rewrittenText, downloadFilename);
      
      if (!downloadSuccess) {
        setError("Failed to download the rewritten content. Please try again.");
      }
    } catch (err) {
      console.error("Error downloading rewritten content:", err);
      setError("An error occurred while downloading the content. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <FileUploader 
          accept=".pdf"
          multiple={false}
          maxSize={10 * 1024 * 1024} // 10MB
          onFilesSelected={handleFilesSelected}
        />
      </div>

      {selectedFile && (
        <div className="bg-light rounded-lg p-4 mb-6">
          <h3 className="font-heading font-semibold text-lg mb-3">Tone Options</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Tone</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={tone}
              onChange={(e) => setTone(e.target.value as 'formal' | 'casual' | 'simple' | 'technical')}
            >
              <option value="formal">Formal (Professional and business-appropriate)</option>
              <option value="casual">Casual (Friendly and conversational)</option>
              <option value="simple">Simple (Easy to understand, basic vocabulary)</option>
              <option value="technical">Technical (Specialized terminology, precise language)</option>
            </select>
          </div>

          <button 
            className={`w-full bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isProcessing}
            onClick={handleRewriteContent}
          >
            {isProcessing ? 'Rewriting Content...' : 'Rewrite Content'}
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
          <p className="flex items-center">
            <i className="bi bi-exclamation-circle mr-2"></i>
            {error}
          </p>
        </div>
      )}

      {rewrittenText && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold text-xl">Rewritten Content ({tone})</h3>
            <button 
              className="text-primary hover:text-blue-700 font-medium flex items-center"
              onClick={handleDownloadText}
            >
              <i className="bi bi-download mr-1"></i> Download
            </button>
          </div>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{rewrittenText}</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h3 className="font-heading font-semibold text-lg mb-2 text-blue-700">
          <i className="bi bi-info-circle mr-2"></i>How It Works
        </h3>
        <p className="text-blue-700 mb-2">
          Our AI-powered Rewrite tool transforms your document content into different tones:
        </p>
        <ul className="list-disc pl-5 text-blue-700">
          <li>Formal: Perfect for business documents, reports, and professional communications</li>
          <li>Casual: Great for emails, blog posts, and informal content</li>
          <li>Simple: Ideal for instructions, explanations, and content for wider audiences</li>
          <li>Technical: Best for academic papers, technical documentation, and specialized reports</li>
        </ul>
      </div>
    </div>
  );
}