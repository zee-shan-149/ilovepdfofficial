import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { AlertCircle } from 'lucide-react';
import { usePdfTools } from '@/hooks/usePdfTools';
import AdBanner from '@/components/AdBanner';
import FileUploader from '@/components/FileUploader';
import AISummarizerTool from '@/components/AISummarizerTool';
import ChatWithPdfTool from '@/components/ChatWithPdfTool';
import RewritePdfTool from '@/components/RewritePdfTool';
import PdfToWordTool from '@/components/PdfToWordTool';

export default function ToolPage() {
  const [, params] = useRoute('/tools/:toolId');
  const { getToolById, getRelatedTools } = usePdfTools();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [mergeMethod, setMergeMethod] = useState('current');
  const [outputFormat, setOutputFormat] = useState('pdf');
  
  const tool = getToolById(params?.toolId || '');
  const relatedTools = tool ? getRelatedTools(tool.id, 5) : [];
  
  // Reset files when tool changes
  useEffect(() => {
    setSelectedFiles([]);
  }, [params?.toolId]);
  
  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
            <h1 className="font-heading font-bold text-2xl">Tool Not Found</h1>
          </div>
          <p className="text-center mt-4">The requested PDF tool could not be found.</p>
        </div>
      </div>
    );
  }
  
  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };
  
  const handleProcessFiles = () => {
    // In a real implementation, this would process the files
    // For now, we'll just show an alert
    alert(`Processing ${selectedFiles.length} files with ${tool.name}`);
  };
  
  // Determine which tool component to render based on tool ID
  const renderToolComponent = () => {
    switch (tool.id) {
      case 'summarize-pdf':
        return <AISummarizerTool />;
      case 'chat-with-pdf':
        return <ChatWithPdfTool />;
      case 'rewrite-pdf':
        return <RewritePdfTool />;
      case 'pdf-to-word':
        return <PdfToWordTool />;
      default:
        return (
          <>
            <FileUploader 
              accept={tool.acceptedFileTypes || '.pdf'}
              multiple={tool.allowMultiple}
              maxFiles={tool.maxFiles || 10}
              maxSize={tool.maxSize || 50 * 1024 * 1024} // 50MB
              onFilesSelected={handleFilesSelected}
            />
            
            {selectedFiles.length > 0 && (
              <div className="file-preview bg-light rounded-lg p-4 mb-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Selected Files</h3>
                <ul className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="flex justify-between items-center bg-white p-2 rounded-lg">
                      <div className="flex items-center">
                        <i className="bi bi-file-earmark-pdf text-primary mr-2"></i>
                        <span className="font-medium">{file.name}</span>
                      </div>
                      <span className="text-gray-500 text-sm">{formatFileSize(file.size)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {tool.id === 'merge-pdf' && selectedFiles.length > 0 && (
              <div className="bg-light rounded-lg p-4 mb-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Merge Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Merge Method</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={mergeMethod}
                      onChange={(e) => setMergeMethod(e.target.value)}
                    >
                      <option value="current">Current order</option>
                      <option value="name">By name (A-Z)</option>
                      <option value="newest">By date (newest first)</option>
                      <option value="oldest">By date (oldest first)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Output Format</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                    >
                      <option value="pdf">PDF</option>
                      <option value="pdfa">PDF/A (Archival)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            <button 
              className={`w-full bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition mb-4 ${selectedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={selectedFiles.length === 0}
              onClick={handleProcessFiles}
            >
              {tool.actionButtonText || `Process ${tool.name}`}
            </button>
          </>
        );
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6 sticky top-24">
            <h3 className="font-heading font-semibold text-lg mb-4">Related Tools</h3>
            <ul className="space-y-3">
              {relatedTools.map(relatedTool => (
                <li key={relatedTool.id}>
                  <a 
                    href={`/tools/${relatedTool.id}`} 
                    className={`flex items-center ${relatedTool.id === tool.id ? 'text-primary font-medium' : 'text-dark hover:text-primary'}`}
                  >
                    <i className={`bi ${relatedTool.icon} mr-2`}></i>
                    <span>{relatedTool.name}</span>
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <AdBanner small={true} />
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 rounded-lg ${tool.bgColorClass} flex items-center justify-center mr-4`}>
                <i className={`bi ${tool.icon} ${tool.iconColorClass} text-2xl`}></i>
              </div>
              <div>
                <h1 className="font-heading font-bold text-2xl md:text-3xl text-dark">{tool.name}</h1>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            </div>
            
            {/* Render the appropriate tool component based on tool ID */}
            {renderToolComponent()}
            
            <p className="text-center text-gray-500 text-sm mt-4">
              By using this service, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="font-heading font-semibold text-xl mb-4">How to {tool.name}</h2>
            <div className="space-y-4">
              {tool.steps && tool.steps.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">{index + 1}</div>
                  <div>
                    <h3 className="font-medium text-lg">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}

              {!tool.steps && (
                <>
                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">1</div>
                    <div>
                      <h3 className="font-medium text-lg">Upload your file(s)</h3>
                      <p className="text-gray-600">Click the upload button or drag and drop your files into the designated area.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">2</div>
                    <div>
                      <h3 className="font-medium text-lg">Select your options</h3>
                      <p className="text-gray-600">Choose the settings that suit your needs for this operation.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">3</div>
                    <div>
                      <h3 className="font-medium text-lg">Process and download</h3>
                      <p className="text-gray-600">Click the process button and then download your file when it's ready.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-heading font-semibold text-xl mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {tool.faqs && tool.faqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-3 rounded-lg bg-light">
                    <span>{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <i className="bi bi-chevron-down"></i>
                    </span>
                  </summary>
                  <div className="mt-3 text-gray-600 px-1">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}

              {!tool.faqs && (
                <>
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-3 rounded-lg bg-light">
                      <span>Is there a limit to how many files I can process?</span>
                      <span className="transition group-open:rotate-180">
                        <i className="bi bi-chevron-down"></i>
                      </span>
                    </summary>
                    <div className="mt-3 text-gray-600 px-1">
                      <p>You can process up to 10 files at once with our free tool. Each file can be up to 50MB in size.</p>
                    </div>
                  </details>
                  
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-3 rounded-lg bg-light">
                      <span>Is this service free to use?</span>
                      <span className="transition group-open:rotate-180">
                        <i className="bi bi-chevron-down"></i>
                      </span>
                    </summary>
                    <div className="mt-3 text-gray-600 px-1">
                      <p>Yes, our PDF tools are completely free to use without any limitations.</p>
                    </div>
                  </details>
                  
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-3 rounded-lg bg-light">
                      <span>Is my data secure when using this tool?</span>
                      <span className="transition group-open:rotate-180">
                        <i className="bi bi-chevron-down"></i>
                      </span>
                    </summary>
                    <div className="mt-3 text-gray-600 px-1">
                      <p>Yes, we take your privacy seriously. All files are processed in your browser and are not uploaded to our servers. Your documents are automatically deleted after processing.</p>
                    </div>
                  </details>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
