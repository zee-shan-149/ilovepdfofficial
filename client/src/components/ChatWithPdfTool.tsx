import { useState, useRef } from 'react';
import { FileProcessor } from '@/lib/fileProcessor';
import FileUploader from './FileUploader';

export default function ChatWithPdfTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setChatHistory([]);
      setError(null);
    }
  };

  const handleSendQuestion = async () => {
    if (!selectedFile || !question.trim()) return;

    // Add user question to chat history
    const userQuestion = question.trim();
    setChatHistory(prev => [...prev, { role: 'user', content: userQuestion }]);
    setQuestion('');
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await FileProcessor.chatWithPdf(selectedFile, userQuestion);
      
      // Add AI response to chat history
      setChatHistory(prev => [...prev, { role: 'assistant', content: result }]);
    } catch (err) {
      console.error("Error chatting with PDF:", err);
      setError("An error occurred while processing your question. Please try again.");
    } finally {
      setIsProcessing(false);
      
      // Scroll to bottom of chat
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };
  
  // Function to download chat history as a text file
  const handleSaveConversation = async () => {
    if (!selectedFile || chatHistory.length === 0) return;
    
    try {
      setIsProcessing(true);
      
      // Format the chat history as text
      const baseFilename = selectedFile.name.replace(/\.[^/.]+$/, "");
      const downloadFilename = `${baseFilename}_conversation.txt`;
      
      let conversationText = `Chat with: ${selectedFile.name}\n`;
      conversationText += `Generated on: ${new Date().toLocaleString()}\n\n`;
      
      chatHistory.forEach(message => {
        const role = message.role === 'user' ? 'You' : 'AI Assistant';
        conversationText += `${role}: ${message.content}\n\n`;
      });
      
      // Use our enhanced download method
      const downloadSuccess = await FileProcessor.downloadTextAsFile(
        conversationText, 
        downloadFilename
      );
      
      if (!downloadSuccess) {
        setError("Failed to download the conversation. Please try again.");
      }
    } catch (err) {
      console.error("Error saving conversation:", err);
      setError("An error occurred while saving the conversation. Please try again.");
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
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-heading font-semibold">Chat with: {selectedFile.name}</h3>
            {chatHistory.length > 0 && (
              <button 
                className="text-primary hover:text-blue-700 font-medium text-sm flex items-center"
                onClick={handleSaveConversation}
                disabled={isProcessing}
              >
                <i className="bi bi-download mr-1"></i> Save Conversation
              </button>
            )}
          </div>
          
          <div className="p-4 h-[400px] overflow-y-auto">
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <p className="text-2xl mb-2">👋 Ask a question about your PDF</p>
                <p>The AI will analyze your document and answer questions based on its content.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {chatHistory.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef}></div>
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-200 p-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4">
                <p className="flex items-center text-sm">
                  <i className="bi bi-exclamation-circle mr-2"></i>
                  {error}
                </p>
              </div>
            )}
            <div className="flex">
              <textarea
                className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Ask a question about your document..."
                rows={2}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isProcessing}
              />
              <button 
                className={`bg-primary text-white px-4 rounded-r-lg hover:bg-blue-600 transition ${isProcessing || !question.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isProcessing || !question.trim()}
                onClick={handleSendQuestion}
              >
                <i className="bi bi-send"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h3 className="font-heading font-semibold text-lg mb-2 text-blue-700">
          <i className="bi bi-info-circle mr-2"></i>How It Works
        </h3>
        <p className="text-blue-700 mb-2">
          Our Chat with PDF tool allows you to interact with your document through natural language:
        </p>
        <ul className="list-disc pl-5 text-blue-700">
          <li>Ask specific questions about the content</li>
          <li>Request explanations of complex topics</li>
          <li>Extract specific data or information</li>
          <li>Perfect for research, learning, and document analysis</li>
        </ul>
      </div>
    </div>
  );
}