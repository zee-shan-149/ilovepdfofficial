import { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface FileUploaderProps {
  accept: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  onFilesSelected: (files: File[]) => void;
}

export default function FileUploader({
  accept,
  multiple = false,
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024, // 50MB
  onFilesSelected
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processFiles = (files: File[]) => {
    // Filter by file type
    const validTypeFiles = files.filter(file => {
      const fileType = file.type.toLowerCase();
      
      // If accept is wildcard, accept all
      if (accept === '*') return true;
      
      // Handle specific extensions (e.g., .pdf)
      const acceptedTypes = accept.split(',').map(type => type.trim().toLowerCase());
      
      for (const type of acceptedTypes) {
        // Handle mime types (e.g., application/pdf)
        if (type.includes('/')) {
          if (fileType === type) return true;
          if (type.endsWith('/*') && fileType.startsWith(type.replace('/*', '/'))) return true;
        } 
        // Handle extensions (e.g., .pdf)
        else if (type.startsWith('.')) {
          if (file.name.toLowerCase().endsWith(type)) return true;
        }
      }
      
      return false;
    });
    
    // Filter by file size
    const validFiles = validTypeFiles.filter(file => file.size <= maxSize);
    
    // Limit number of files
    const selectedFiles = multiple ? validFiles.slice(0, maxFiles) : [validFiles[0]].filter(Boolean);
    
    if (selectedFiles.length > 0) {
      onFilesSelected(selectedFiles);
    }
    
    // Reset the input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div 
      className={`upload-zone rounded-xl p-8 text-center mb-6 ${isDragging ? 'dragover' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <i className="bi bi-cloud-arrow-up text-primary text-4xl mb-3"></i>
      <h3 className="font-heading font-semibold text-lg mb-2">Drop files here or click to upload</h3>
      <p className="text-gray-600 mb-4">
        Support for {accept.split(',').join(', ')} files. 
        {multiple ? `Up to ${maxFiles} files` : 'Single file'}, 
        max {formatFileSize(maxSize)} each.
      </p>
      <button 
        className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        onClick={handleButtonClick}
      >
        Select Files
      </button>
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        multiple={multiple}
        accept={accept}
        onChange={handleFileInputChange}
      />
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
