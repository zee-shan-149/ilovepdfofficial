import { useState } from 'react';
import { FileProcessor } from '@/lib/fileProcessor';
import FileUploader from './FileUploader';

export default function AISummarizerTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [summaryLength, setSummaryLength] = useState<'brief' | 'moderate' | 'detailed'>('moderate');
  const [summary, setSummary] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setSummary('');
      setError(null);
    }
  };

  const handleGenerateSummary = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await FileProcessor.summarizePdf(selectedFile, { length: summaryLength });
      setSummary(result);
    } catch (err) {
      console.error("Error summarizing PDF:", err);
      setError("An error occurred while summarizing the document. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadSummary = async () => {
    if (!summary || !selectedFile) return;
    
    // Generate a filename based on the original PDF filename
    const baseFilename = selectedFile.name.replace(/\.[^/.]+$/, ""); // Remove extension
    const downloadFilename = `${baseFilename}_summary.txt`;
    
    try {
      // Show a small processing indicator before download
      setIsProcessing(true);
      
      // Use the enhanced download method that returns a promise
      const downloadSuccess = await FileProcessor.downloadTextAsFile(summary, downloadFilename);
      
      if (!downloadSuccess) {
        setError("Failed to download the summary. Please try again.");
      }
    } catch (err) {
      console.error("Error downloading summary:", err);
      setError("An error occurred while downloading the summary. Please try again.");
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
          <h3 className="font-heading font-semibold text-lg mb-3">Summary Options</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Summary Length</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={summaryLength}
              onChange={(e) => setSummaryLength(e.target.value as 'brief' | 'moderate' | 'detailed')}
            >
              <option value="brief">Brief (Short summary with key points)</option>
              <option value="moderate">Moderate (Balanced summary with important details)</option>
              <option value="detailed">Detailed (Comprehensive summary of the document)</option>
            </select>
          </div>

          <button 
            className={`w-full bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isProcessing}
            onClick={handleGenerateSummary}
          >
            {isProcessing ? 'Generating Summary...' : 'Generate Summary'}
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

      {summary && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold text-xl">Document Summary</h3>
            <button 
              className="text-primary hover:text-blue-700 font-medium flex items-center"
              onClick={handleDownloadSummary}
            >
              <i className="bi bi-download mr-1"></i> Download
            </button>
          </div>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{summary}</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h3 className="font-heading font-semibold text-lg mb-2 text-blue-700">
          <i className="bi bi-info-circle mr-2"></i>How It Works
        </h3>
        <p className="text-blue-700 mb-2">
          Our AI-powered PDF summarizer analyzes your document and extracts the most important information:
        </p>
        <ul className="list-disc pl-5 text-blue-700">
          <li>Quickly get the key points from long documents</li>
          <li>Choose the level of detail you need</li>
          <li>Perfect for research papers, reports, articles, and more</li>
          <li>All processing happens securely on our servers</li>
        </ul>
      </div>
    </div>
  );
}