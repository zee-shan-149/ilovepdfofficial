import { useState } from 'react';
import { FileProcessor } from '@/lib/fileProcessor';
import FileUploader from './FileUploader';

export default function PdfToWordTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversionComplete, setConversionComplete] = useState(false);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setError(null);
      setConversionComplete(false);
    }
  };

  const handleConvertPdf = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    setConversionComplete(false);
    
    try {
      // Show processing message
      console.log(`Processing 1 file with PDF to Word`);
      
      // Process the PDF to Word conversion
      const wordBlob = await FileProcessor.pdfToWord(selectedFile);
      
      // Generate a filename for the Word document
      const baseFilename = selectedFile.name.replace(/\.[^/.]+$/, ""); // Remove extension
      const wordFilename = `${baseFilename}.docx`;
      
      console.log(`Conversion complete, downloading: ${wordFilename}`);
      
      // Download the converted file with enhanced method
      const downloadSuccess = await FileProcessor.downloadFile(wordBlob, wordFilename);
      
      if (downloadSuccess) {
        // Mark conversion as complete
        setConversionComplete(true);
        console.log("File download initiated successfully");
      } else {
        throw new Error("Download failed");
      }
    } catch (err) {
      console.error("Error converting PDF to Word:", err);
      setError("An error occurred while converting or downloading the document. Please try again.");
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
          <h3 className="font-heading font-semibold text-lg mb-3">Conversion Options</h3>
          <p className="text-gray-700 mb-4">
            Your PDF will be converted to Microsoft Word format (.docx) with the highest possible accuracy.
            Text, images, and basic formatting will be preserved.
          </p>

          <button 
            className={`w-full bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isProcessing}
            onClick={handleConvertPdf}
          >
            {isProcessing ? 'Converting...' : 'Convert to Word'}
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

      {conversionComplete && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6">
          <p className="flex items-center">
            <i className="bi bi-check-circle mr-2"></i>
            Conversion complete! Your file has been downloaded.
          </p>
          <p className="mt-2 text-sm">
            If your download didn't start automatically, 
            <button 
              className="text-primary font-medium underline ml-1"
              onClick={async () => {
                if (selectedFile) {
                  const baseFilename = selectedFile.name.replace(/\.[^/.]+$/, "");
                  const wordFilename = `${baseFilename}.docx`;
                  
                  try {
                    // Process again and download
                    const wordBlob = await FileProcessor.pdfToWord(selectedFile);
                    const downloadSuccess = await FileProcessor.downloadFile(wordBlob, wordFilename);
                    
                    if (!downloadSuccess) {
                      alert('Download failed. Please check your browser settings and try again.');
                    }
                  } catch (err) {
                    console.error('Error retrying download:', err);
                    alert('Error processing file. Please try again.');
                  }
                }
              }}
            >
              click here
            </button> to try again.
          </p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h3 className="font-heading font-semibold text-lg mb-2 text-blue-700">
          <i className="bi bi-info-circle mr-2"></i>How It Works
        </h3>
        <p className="text-blue-700 mb-2">
          Our PDF to Word converter transforms your PDF documents into editable Microsoft Word files:
        </p>
        <ul className="list-disc pl-5 text-blue-700">
          <li>Preserves text formatting including fonts, paragraphs, and lists</li>
          <li>Maintains images and their positions</li>
          <li>Retains tables and simple layouts</li>
          <li>Converts hyperlinks and basic formatting</li>
        </ul>
      </div>
    </div>
  );
}